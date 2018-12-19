import AbstractCQElement from './cq-element.js';

class GameList extends AbstractCQElement {

    init(){
        fetch("http://localhost:8080/games/")
            .then(response => response.json())
            .then(json => this.showGameList(json));
    }

    showGameList(json){
        let outerUl = this.byId("gameList");

        json.forEach(element => {
            let gamePlayLi = htmlToElement(`
                <li class="list-group-item" id="` + (element.id + "Li") + `">
                    <p>` + element.name + `</p>
                    <p>[` + element.location + `]</p>
                    <button type="button">Play</button>
                </li>
            `);

            let gameDetailsLi = htmlToElement(`
                <li>
                    <ul>
                        <li> <b> Location: </b> </li>       <li>` + element.location + `</li>
                        <li> <b> Description: </b> </li>    <li>` + element.description + `</li>
                        <li> <b> Latitude: </b> </li>       <li>` + element.coordinates.lat + `</li>
                        <li> <b> Longitude: </b> </li>      <li>` + element.coordinates.lon + `</li>
                    </ul>
                </li>
            `);

            gamePlayLi.onclick = () => { this.toggleList(gamePlayLi, gameDetailsLi); };
            gamePlayLi.querySelector("button").addEventListener("click", () => this.app.router.navigate('/games/' + element.id));

            outerUl.appendChild(gamePlayLi);
            outerUl.appendChild(gameDetailsLi);
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
            <ul id="gameList" class="list-group"></ul>
        `;
    }
}
customElements.define("cq-game-list", GameList);
