import AbstractCQElement from './cq-element.js';
import './cq-game-rating.js';

class GameList extends AbstractCQElement {

    init(){
        this.initEventListeners();
        this.fetchFromUrl("/games");
    }

    initEventListeners(){
        this.byId("nearest").addEventListener('click',
            () => navigator.geolocation.getCurrentPosition(
                position => this.fetchFromUrl("/games/nearest", { latitude : position.coords.latitude, longitude : position.coords.longitude })));

        this.byId("recommendation").addEventListener('click',
            () => this.fetchFromUrl("/games/recommendations", { email : this.byId("email").value}));
    }

    fetchFromUrl(url, params){
        fetch(backendUrl + url + queryString(params))
            .then(response => response.json())
            .then(json => this.showGameList(json));
    }

    showGameList(json){
        let outerUl = this.byId("gameList");
        $(outerUl).empty();

        json.forEach(game => {
            let gamePlayLi = htmlToElement(`
                <li class="list-group-item" id="` + (game.id + "Li") + `">
                    <p>` + game.name + `</p>
                    <p>[` + game.location + `]</p>
                    <button type="button">Play</button>
                </li>
            `);

            let gameDetailsLi = htmlToElement(`
                <li>
                    <ul>
                        <li><cq-game-rating></cq-game-rating></li>
                        <li> <b> Location: </b> </li>       <li>` + game.location + `</li>
                        <li> <b> Description: </b> </li>    <li>` + game.description + `</li>
                        <li> <b> Latitude: </b> </li>       <li>` + game.coordinates.lat + `</li>
                        <li> <b> Longitude: </b> </li>      <li>` + game.coordinates.lon + `</li>
                    </ul>
                </li>
            `);

            outerUl.appendChild(gamePlayLi);
            outerUl.appendChild(gameDetailsLi);

            gamePlayLi.onclick = () => this.toggleList(gamePlayLi, gameDetailsLi);
            gamePlayLi.querySelector("button").addEventListener('click', () => this.app.router.navigate('/games/' + game.id));
            gameDetailsLi.querySelector("cq-game-rating").init(game.id, this.byId("email"));
        });
    }

    toggleList(gamePlayLi, gameDetailsLi){
        gamePlayLi.classList.toggle("inverted");
        gameDetailsLi.classList.toggle("expanded");
    }

    get template() {
        return `
            <link rel="stylesheet" href="https://unpkg.com/bootstrap-material-design@4.1.1/dist/css/bootstrap-material-design.min.css"/>
            <link rel="stylesheet" href="../css/style.css"/>
            
            <h3>Games</h3>
            
            <p><button id="nearest" class="btn btn-primary">Show 10 nearest games in order</button></p>
            <p><button id="recommendation" class="btn btn-primary">Show 10 most recommended games in order</button></p>
            <p><label>Selected email: <input type="email" id="email" value="user@test.com"></label></p>
            
            <ul id="gameList" class="list-group"></ul>
        `;
    }
}
customElements.define("cq-game-list", GameList);
