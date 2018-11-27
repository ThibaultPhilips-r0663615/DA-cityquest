var getAGame = new XMLHttpRequest();

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
    showGame(elemnt){
        
    }
    get template() {
        return `
            <link rel="stylesheet" href="https://unpkg.com/bootstrap-material-design@4.1.1/dist/css/bootstrap-material-design.min.css"/>
            <style>
                #navBar {

            </style>
            <h3>Game details</h3>
        `;
    }
}
customElements.define("cq-game-details", CityQuestGameDetails);