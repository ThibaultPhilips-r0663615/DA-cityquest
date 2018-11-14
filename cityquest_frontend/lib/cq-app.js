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
          <p>Dit is de cq.app.js file</p>
        `;
    }
}
customElements.define("cq-app", CityQuestApp);