import AbstractCQElement from './cq-element.js';
import CityQuestGameEngine from'./cq-game-engine.js';
import './cq-show-question.js';
import './cq-result-screen.js';

class CityQuestGameDetails extends AbstractCQElement {

    init(params){
        this.shadowRoot.loadScript('https://unpkg.com/leaflet@1.3.4/dist/leaflet.js')       // Why? Scripts are only loaded when using appendChild
            .thenFetch(backendUrl + "/games/" + params.id)                          // Why? Scripts are loaded async, so use promise to execute code afterwards
            .then(response => response.json())
            .then(json => this.showGame(json));
    }

    destroy(){
        navigator.geolocation.clearWatch(this.geoLocationWatchID);
    }

    showGame(game) {
        this.gameEngine = new CityQuestGameEngine(game);
        this.byId("question").addEventListener("GameFinished", () => this.byId("result").showResult(this.gameEngine));

        this.byId("gameName").innerHTML         = game.name;
        this.byId("gameLocation").innerHTML     = game.location;
        this.byId("gameDescription").innerHTML  = game.description;
        this.byId("gameLatitude").innerHTML     = game.coordinates.lat;
        this.byId("gameLongitude").innerHTML    = game.coordinates.lon;
        
        let mapDiv = this.byId('map');
        this.map = L.map(mapDiv, {center: [game.coordinates.lat, game.coordinates.lon], zoom: 14, zoomSnap: 0.1});
        L
            .tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'})
            .addTo(this.map);

        let questionIcon = L.icon({
            iconUrl: '../images/marker_black.png',
            iconSize: [40, 45],
            iconAnchor: [20, 45]
        });

        game.questions.forEach(question => {
            L
                .marker([question.coordinates.lat, question.coordinates.lon], { icon: questionIcon, title: "Question: " + question.question })
                .addTo(this.map);
        });


        this.geoLocationWatchID = navigator.geolocation.watchPosition(
            (position) => this.showOnMap(position.coords),
            (error) => console.error(error),
            { enableHighAccuracy: true, timeout: 5000, maximumAge: 5000 });
    }

    showOnMap(coords) {
        if(this.currentLocation) {
            this.currentLocation.setLatLng([coords.latitude, coords.longitude]);
        } else {
            let currentLocationIcon = L.icon({
                iconUrl: '../images/marker_red.png',
                iconSize: [40, 45],
                iconAnchor: [20, 45]
            });

            this.currentLocation = L
                .marker([coords.latitude, coords.longitude], { icon: currentLocationIcon, title: 'You are here!'})
                .addTo(this.map);
        }

        let questionElement = this.byId("question");
        if(!questionElement.isQuestionActive){
            let question = this.gameEngine.getNextQuestion(coords);
            if(question) questionElement.activateQuestion(question, this.gameEngine);
        }
    }

    get template() {
        return `
            <link rel="stylesheet" href="https://unpkg.com/bootstrap-material-design@4.1.1/dist/css/bootstrap-material-design.min.css"/>
            <link rel="stylesheet" href="https://unpkg.com/leaflet@1.3.4/dist/leaflet.css" integrity="sha512-puBpdR0798OZvTTbP4A8Ix/l+A4dHDD0DGqYW6RQ+9jxkRFclaxxQb/SJAWZfWAkuyeQUytO7+7N4QKrDh+drA==" crossorigin=""/>
            <link rel="stylesheet" href="../css/style.css"/>
            
            <h3>Game details</h3>
            <div id="game">
                <p class="game-detail-label">Name: </p>         <p id="gameName"></p>
                <p class="game-detail-label">Description: </p>  <p id="gameDescription"></p>
                <p class="game-detail-label">Location: </p>     <p id="gameLocation"></p>
                <p class="game-detail-label">Latitude: </p>     <p id="gameLatitude"></p>
                <p class="game-detail-label">Longitude: </p>    <p id="gameLongitude"></p>
            </div>
            
            <div id="information">
                <div><img src="../images/marker_red.png"><p> Your location!</p></div>
                <div><img src="../images/marker_black.png"><p> The location of the question!</p></div>
            </div>

            <cq-show-question id="question"></cq-show-question>
            <cq-result-screen id="result"></cq-result-screen>
            <div id="map"></div>
        `;
    }
}
customElements.define("cq-game-details", CityQuestGameDetails);