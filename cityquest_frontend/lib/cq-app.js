class CityQuestApp extends HTMLElement {

    connectedCallback() {
        this.initShadowDom();
    }

    initShadowDom() {
        let shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.innerHTML = this.template;
    }

    get template() {
        return `
            <link rel="stylesheet" href="https://unpkg.com/bootstrap-material-design@4.1.1/dist/css/bootstrap-material-design.min.css"/>
            <h1>City Quest</h1>

            <h3>Games</h3>
        `;
    }
}
customElements.define("cq-app", CityQuestApp);