var getAGame = new XMLHttpRequest();


class CityQuestGameDetails extends HTMLElement {

    connectedCallback() {
        this.initShadowDom();

        let url = new URL(window.location.href);
        let id = url.searchParams.get("id");
        this.fetchGame(id);
    }

    initShadowDom() {
        let shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.innerHTML = this.template;
    }

    fetchGame(id){   
        fetch("http://localhost:8080/games/" + id)
            .then(response => response.json())
            .then(json => this.showGame(json));
    }
    showGame(game) {
        this.game = game;
        this.showGameDetails(game);
        
        let mapDiv = document.getElementById('map');
        mapDiv.style.display = 'block';
        mapDiv.style.width = "60%";
        mapDiv.style.height = "50%";
        mapDiv.style.marginBottom = "3%";
        this.map = L.map(mapDiv, {center: [game.coordinates.lat, game.coordinates.lon], zoom: 14.4, zoomSnap: 0.1});
        L
            .tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'})
            .addTo(this.map);
        
        var myIcon = L.icon({
            iconUrl: './marker_black.png',
            iconSize: [40, 45],
            iconAnchor: [40, 45],
            popupAnchor: [-3, -76],
            shadowUrl: '',
            shadowSize: [40, 45],
            shadowAnchor: [40, 45]
        });
        for(let i = 0; i < game.questions.length; i++){
            L
                .marker([game.questions[i].coordinates.lat, game.questions[i].coordinates.lon], { icon: myIcon, title: "Question: " + game.questions[i].question })
                .addTo(this.map);
        }


        this.geoLocationWatchID = navigator.geolocation.watchPosition(
            (position) => this.showOnMap(position.coords), 
            (error) => console.error(error),
            { enableHighAccuracy: true, timeout: 5000, maximumAge: 5000 });
    }
    showOnMap(coords) {
        var myIcon2 = L.icon({
            iconUrl: './marker_red.png',
            iconSize: [40, 45],
            iconAnchor: [40, 45],
            popupAnchor: [-3, -76],
            shadowUrl: '',
            shadowSize: [40, 45],
            shadowAnchor: [40, 45]
        });
        if(this.currentLocation) {
            this.currentLocation.setLatLng([coords.latitude, coords.longitude]);
        } else {
            this.currentLocation = L
                .marker([coords.latitude, coords.longitude], { icon: myIcon2, title: 'You are here!'})
                .addTo(this.map);
        }
    }
    showGameDetails(game){
        let div = this.shadowRoot.getElementById("game");

        let gameNameDescription = document.createElement("p");
        gameNameDescription.className = "game-detail-label";
        gameNameDescription.innerHTML = "Name: ";
        let gameNameP = document.createElement("p");
        gameNameP.innerHTML = game.name;

        let gameDescriptionDescription = document.createElement("p");
        gameDescriptionDescription.className = "game-detail-label";
        gameDescriptionDescription.innerHTML = "Description: ";
        let gameDescriptionP = document.createElement("p");
        gameDescriptionP.innerHTML = game.description;

        let gameLocationDescription = document.createElement("p");
        gameLocationDescription.className = "game-detail-label";
        gameLocationDescription.innerHTML = "Location: ";
        let gameLocationP = document.createElement("p");
        gameLocationP.innerHTML = game.location;

        let gameLongitudeDescription = document.createElement("p");
        gameLongitudeDescription.className = "game-detail-label";
        gameLongitudeDescription.innerHTML = "Longitude: ";
        let gameLongitudeP = document.createElement("span");
        gameLongitudeP.innerHTML = game.coordinates.lon;

        let gameLatitudeDescription = document.createElement("p");
        gameLatitudeDescription.className = "game-detail-label";
        gameLatitudeDescription.innerHTML = "Latitude: ";
        let gameLatitudeP = document.createElement("span");
        gameLatitudeP.innerHTML = game.coordinates.lat;

        div.appendChild(gameNameDescription); div.appendChild(gameNameP); div.appendChild(gameLocationDescription); div.appendChild(gameLocationP); div.appendChild(gameDescriptionDescription); div.appendChild(gameDescriptionP); 
        div.appendChild(gameLongitudeDescription); div.appendChild(gameLongitudeP); div.appendChild(gameLatitudeDescription); div.appendChild(gameLatitudeP);
    }
    get template() {
        return `
            <link rel="stylesheet" href="https://unpkg.com/bootstrap-material-design@4.1.1/dist/css/bootstrap-material-design.min.css"/>
            <style>
                #information{
                    margin-top: 3%;
                }
                #information > div {
                    display: flex;
                }
                #information > div > img {
                    width: 2%;
                    height: 4%;
                }       
                #game > p {
                    margin-top: 1%;
                    margin-bottom: 1%;
                }
                #game > .game-detail-label {
                    text-decoration: underline;
                    text-decoration-color: #009688;
                }
            </style>
            <h3>Game details</h3>
            <div id="game"></div>
            <div id="information">
                <div><img src="marker_red.png"><p> Your location!</p></div>
                <div><img src="marker_black.png"><p> The location of the question!</p></div>
            </div>
        `;
    }
}
customElements.define("cq-game-details", CityQuestGameDetails);