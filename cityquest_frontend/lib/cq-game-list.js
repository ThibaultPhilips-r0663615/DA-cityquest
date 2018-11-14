class GameList extends HTMLElement {

    connectedCallback() {
        this.initShadowDom();
        this.fetchGameList();
    }

    initShadowDom() {
        let shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.innerHTML = this.template;
    }

    fetchGameList(){
        fetch("http://localhost:8080/games/")
            .then(response => response.json())
            .then(json => this.showGameList(json));
    }

    showGameList(json){
        let ul = this.shadowRoot.querySelector("#gameList");
        json.forEach(element => {
            let li = document.createElement("li");
            li.innerHTML = element.name;
            ul.appendChild(li);
        });
    }

    get template() {
        return `
          <ul id="gameList"></ul>
        `;
    }
}
customElements.define("cq-game-list", GameList);