import AbstractCQElement from './cq-element.js';
import './cq-game-list.js'
import './cq-add-game.js'
import './cq-game-details.js'

class CityQuestApp extends AbstractCQElement {

    connectedCallback() {
        super.connectedCallback();
        this.initEventListeners();
        this.router = new Navigo(null, true);
        this.router
            .on(() => this.show('cq-game-list'))
            .on('/home', (params) => this.show('cq-game-list', params))
            .on('games/new', (params) => this.show('cq-add-game', params))
            .on('games/:id', (params) => this.show('cq-game-details', params))
            .resolve();
    }

    initEventListeners(){
        this.byId("homeNav").addEventListener('click', () => this.app.router.navigate('/home'));
        this.byId("newGameNav").addEventListener('click', () => this.app.router.navigate('/games/new'));
    }

    get template() {
        return `
            <link rel="stylesheet" href="https://unpkg.com/bootstrap-material-design@4.1.1/dist/css/bootstrap-material-design.min.css"/>
            <h1>City Quest</h1>
            <div id="navBar">
                <button id="homeNav" class="btn btn-primary">Home</button>
                <button id="newGameNav" class="btn btn-primary">Add game</buton>
            </div>
        `;
    }
    
    show(element, params) {
        let previousElement = this.byId("CurrentElement");
        if(previousElement) {
            if(previousElement.destroy) previousElement.destroy();
            this.shadowRoot.removeChild(previousElement);
        }

        let newElement = document.createElement(element);
        newElement.id = "CurrentElement";

        this.shadowRoot.appendChild(newElement);
        if(newElement.init) newElement.init(params);
    }  
}
customElements.define("cq-app", CityQuestApp);
