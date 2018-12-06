import AbstractCQElement from './cq-element.js';

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
customElements.define("cq-app", CityQuestApp);