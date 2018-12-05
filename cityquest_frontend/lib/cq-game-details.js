var questionAlreadyDone = new Array();

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
        this.map = L.map(mapDiv, {center: [game.coordinates.lat, game.coordinates.lon], zoom: 14.4, zoomSnap: 0.1});
        L
            .tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'})
            .addTo(this.map);
        
        var myIcon = L.icon({
            iconUrl: './marker_black.png',
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
            iconUrl: './marker_red.png',
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

        this.game.questions.forEach(element => {
            let distance = this.getDistInMeter(element.coordinates, coords);
            //Edit to 50, left at high number for testing purpose.
            if(distance < 20000){
                let alreadyAsked = false;
                for(let i = 0; i < questionAlreadyDone.length; i++){
                    if(questionAlreadyDone[i] == element){
                        alreadyAsked = true;
                    }
                }
                if(alreadyAsked == false){
                    this.shadowRoot.getElementById("QuestionTitle").innerHTML = element.question;
                    this.shadowRoot.getElementById("QuestionLatitude").innerHTML = element.coordinates.lat;
                    this.shadowRoot.getElementById("QuestionLongitude").innerHTML = element.coordinates.lon;
                    let answersDiv = this.shadowRoot.getElementById("QuestionPossibleAnswers");
                    let correctAnswerSelect = this.shadowRoot.getElementById("QuestionAnswer");
                    let count = 1;
                    answersDiv.innerHTML = "";
                    element.answers.forEach(element => {
                        let answer = document.createElement("p");
                        answer.innerHTML = element;
                        answersDiv.appendChild(answer);
                        let option = document.createElement("option");
                        option.innerHTML = count;
                        correctAnswerSelect.appendChild(option);
                        count++;
                    });
                    let sendButton = this.shadowRoot.getElementById("SendAnswer");
                    sendButton.onclick =() => this.sendAnswer();
                    $(this.shadowRoot.getElementById("QuestionModal")).modal('show');
                    questionAlreadyDone[questionAlreadyDone.length] = element;
                }
                alreadyAsked = false;
            }
        });
    }
    sendAnswer(){
        let selectedAnswer = document.getElementById("QuestionAnswer");
        alert(selectedAnswer.options[selectedAnswer.selectedIndex].text);
    }
    showGameDetails(game){
        let div = this.shadowRoot.getElementById("game");

        let gameNameDescription = htmlToElement('<p class="game-detail-label">Name: </p>');
        let gameNameP = htmlToElement('<p>' + game.name + '</p>');

        let gameDescriptionDescription = htmlToElement('<p class="game-detail-label">Description: </p>');
        let gameDescriptionP = htmlToElement('<p>' + game.description + '</p>');

        let gameLocationDescription = htmlToElement('<p class="game-detail-label">Location: </p>');
        let gameLocationP = htmlToElement('<p>' + game.location + '</p>');

        let gameLatitudeDescription = htmlToElement('<p class="game-detail-label">Latitude: </p>');
        let gameLatitudeP = htmlToElement('<p>' + game.coordinates.lat + '</p>');

        let gameLongitudeDescription = htmlToElement('<p class="game-detail-label">Longitude: </p>');
        let gameLongitudeP = htmlToElement('<p>' + game.coordinates.lon + '</p>');

        div.appendChild(gameNameDescription); div.appendChild(gameNameP);
        div.appendChild(gameDescriptionDescription); div.appendChild(gameDescriptionP); 
        div.appendChild(gameLocationDescription); div.appendChild(gameLocationP);
        div.appendChild(gameLatitudeDescription); div.appendChild(gameLatitudeP);
        div.appendChild(gameLongitudeDescription); div.appendChild(gameLongitudeP); 
    }


    getDistInMeter(coordinates1, coordinates2){
        let R = 6371;
        let dLat = toRadians(coordinates2.latitude - coordinates1.lat);
        let dLon = toRadians(coordinates2.longitude - coordinates1.lon);

        let a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                   Math.cos(toRadians(coordinates1.lat)) * Math.cos(toRadians(coordinates2.latitude)) *
                   Math.sin(dLon/2) * Math.sin(dLon/2);

        let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

        return (R * c * 1000);
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
            <div id="game"></div>
            <div id="information">
                <div><img src="marker_red.png"><p> Your location!</p></div>
                <div><img src="marker_black.png"><p> The location of the question!</p></div>
            </div>

            <div id="QuestionModal" class="modal" tabindex="-1" role="dialog">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title" id="QuestionTitle"></h4>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <p class="question-detail-label">Latitude of the question: </p>
                        <p id="QuestionLatitude"></p> 
                        <p class="question-detail-label">Longitude of the question: </p>
                        <p id="QuestionLongitude"></p>
                        <p class="question-detail-label">All the possible answers: </p>
                        <div id="QuestionPossibleAnswers">
                        </div>
                        <p class="question-detail-label">Select the correct answer.</p>
                        <select multiple class="form-control" id="QuestionAnswer">
                        </select>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button id="SendAnswer" data-dismiss="modal" class="btn btn-primary">Send answer</button>
                    </div>
                    </div>
                </div>
            </div>
        `;
    }
}
customElements.define("cq-game-details", CityQuestGameDetails);

function toRadians(degrees){
    return degrees * Math.PI / 100;
}