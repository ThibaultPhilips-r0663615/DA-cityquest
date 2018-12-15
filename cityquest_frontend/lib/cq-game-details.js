import AbstractCQElement from './cq-element.js';
import CityQuestGameEngine from'./cq-game-engine.js';
import './cq-show-question.js';
import './cq-result-screen.js';

class CityQuestGameDetails extends AbstractCQElement {

    init(params){
        this.fetchGame(params.id);
    }

    fetchGame(id){
        fetch("http://localhost:8080/games/" + id)
            .then(response => response.json())
            .then(json => this.showGame(json));
    }

    showGame(game) {
        this.gameEngine = new CityQuestGameEngine(game, this);
        this.shadowRoot.getElementById("gameName").innerHTML = game.name;
        this.shadowRoot.getElementById("gameDescription").innerHTML = game.description;
        this.shadowRoot.getElementById("gameLocation").innerHTML = game.location;
        this.shadowRoot.getElementById("gameLatitude").innerHTML = game.coordinates.lat;
        this.shadowRoot.getElementById("gameLongitude").innerHTML = game.coordinates.lon;
        
        let mapDiv = document.getElementById('map');
        mapDiv.style.display = "block";
        this.map = L.map(mapDiv, {center: [game.coordinates.lat, game.coordinates.lon], zoom: 14.4, zoomSnap: 0.1});
        L
            .tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'})
            .addTo(this.map);
        
        var myIcon = L.icon({
            iconUrl: './images/marker_black.png',
            iconSize: [40, 45],
            iconAnchor: [20, 45]
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
            iconUrl: './images/marker_red.png',
            iconSize: [40, 45],
            iconAnchor: [20, 45]
        });
        if(this.currentLocation) {
            this.currentLocation.setLatLng([coords.latitude, coords.longitude]);
        } else {
            this.currentLocation = L
                .marker([coords.latitude, coords.longitude], { icon: myIcon2, title: 'You are here!'})
                .addTo(this.map);
        }

        let question = this.gameEngine.getNextQuestion(coords);
        
        if(question != undefined){
            let showQuestion = document.createElement("cq-show-question"); 
            this.shadowRoot.getElementById("questionPlaceHolder").appendChild(showQuestion);
            showQuestion.init(question, this.gameEngine);
        }
    }

    showGameResult(result){
        let showResultScreen = document.createElement("cq-result-screen"); 
        this.shadowRoot.getElementById("resultPlaceHolder").appendChild(showResultScreen);
        showResultScreen.init(result, this.gameEngine);
    }

    destroy() {
        document.getElementById("map").style.display = 'none';
        this.map.remove();
        navigator.geolocation.watchPosition;
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
                .game-detail-label {
                    margin-bottom: 0%;
                    margin-top: 2%;
                    text-decoration: underline;
                    text-decoration-color: #009688;
                }
            </style>
            <h3>Game details</h3>
            <div id="game">
                <p class="game-detail-label">Name: </p>
                <p id="gameName"></p>
                <p class="game-detail-label">Description: </p>
                <p id="gameDescription"></p>
                <p class="game-detail-label">Location: </p>
                <p id="gameLocation"></p>
                <p class="game-detail-label">Latitude: </p>
                <p id="gameLatitude"></p>
                <p class="game-detail-label">Longitude: </p>
                <p id="gameLongitude"></p>
            </div>
            <div id="information">
                <div><img src="./images/marker_red.png"><p> Your location!</p></div>
                <div><img src="./images/marker_black.png"><p> The location of the question!</p></div>
            </div>

            <div id="questionPlaceHolder"></div>
            <div id="resultPlaceHolder"></div>
        `;
    }
}
customElements.define("cq-game-details", CityQuestGameDetails);