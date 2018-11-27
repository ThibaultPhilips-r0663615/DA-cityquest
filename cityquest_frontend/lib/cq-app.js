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
            <style>
                #navBar {
                    display: flex;
                    width: 20%;
                    margin-top: 2%;
                    margin-bottom: 2%;
                }
            </style>
            <h1>City Quest</h1>
            <div id="navBar"><button onclick="window.location.href='index.html'" class="btn btn-primary">Home</button><button onclick="window.location.href='addGameForm.html'" class="btn btn-primary">Add game</buton></div>
        `;
    }
}
customElements.define("cq-app", CityQuestApp);