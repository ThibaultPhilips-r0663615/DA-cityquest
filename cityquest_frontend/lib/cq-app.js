import AbstractCQElement from './cq-element.js';
import './cq-game-list.js'
import './cq-add-game.js'
import './cq-game-details.js'

class CityQuestApp extends AbstractCQElement {

    connectedCallback() {
        super.connectedCallback();
        this.router = new Navigo(null, true);
        this.router
            .on(() => this.show('cq-game-list'))
            .on('/home', (params) => this.show('cq-game-list', params))
            .on('games/new', (params) => this.show('cq-add-game', params))
            .on('games/:id', (params) => this.show('cq-game-details', params))
            .resolve();
    }

    initEventListeners(){
        this.shadowRoot.getElementById("homeNav").addEventListener('click', e => this.app.router.navigate('/home'));
        this.shadowRoot.getElementById("newGameNav").addEventListener('click', e => this.app.router.navigate('/games/new'));
    }

    get template() {
        return `
            <link rel="stylesheet" href="https://unpkg.com/bootstrap-material-design@4.1.1/dist/css/bootstrap-material-design.min.css"/>
            <h1>City Quest</h1>
            <div id="navBar"><button id="homeNav" class="btn btn-primary">Home</button><button id="newGameNav" class="btn btn-primary">Add game</buton></div>
        `;
    }
    
    show(el, params, query) {
        let element = document.createElement(el);
        while(this.shadowRoot.childNodes.length > 0) {
            if(this.shadowRoot.childNodes[0].destroy) {
                this.shadowRoot.childNodes[0].destroy();
            }
            this.shadowRoot.removeChild(this.shadowRoot.childNodes[0]);
        }
        this.shadowRoot.innerHTML = this.template;
        this.initEventListeners();
        this.shadowRoot.appendChild(element);
        if(element.init) {
            element.init(params, query);
        }
    }  
}
customElements.define("cq-app", CityQuestApp);


/*import AbstractCQElement from './cq-element.js';

class CityQuestApp extends AbstractCQElement {
    connectedCallback() {   
        this.initShadowDom();
    }

    initShadowDom() {
        let shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.innerHTML = this.template;
    }

    get template() {
        return `
            <h1>City Quest</h1>
            <div id="navBar">
                <a href='index.html' class="btn btn-primary">Home</a>
                <a href='addGameForm.html' class="btn btn-primary">Add game</a>
            </div>
        `;
    }
}
customElements.define("cq-app", CityQuestApp);*/