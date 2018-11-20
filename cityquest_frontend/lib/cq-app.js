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
            <h1>City Quest</h1>

            <h3>Games</h3>
        `;
    }
}
customElements.define("cq-app", CityQuestApp);