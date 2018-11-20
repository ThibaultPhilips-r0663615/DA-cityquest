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

    displayDetails(id){
        let doc = this.shadowRoot.getElementById(id);
        if(doc.style.display == "none"){
            doc.style.display = "block";
        }
        else{
            doc.style.display = "none";
        }
    }

    showGameList(json){
        let ul = this.shadowRoot.querySelector("#gameList");
        json.forEach(element => {
            let liName = document.createElement("li");
            liName.className = "list-group-item";
            liName.innerHTML = element.name;
            liName.onclick =() => this.displayDetails(element.id);
            ul.appendChild(liName);

            let innerUl = document.createElement("ul");
            innerUl.id = element.id;
            innerUl.style.display = "none";
            let liLocation = document.createElement("li");
            liLocation.innerHTML = element.location;
            let liDescription = document.createElement("li");
            liDescription.innerHTML = element.description;
            let liLongtitude = document.createElement("li");
            liLongtitude.innerHTML = element.coordinates.lon;
            let liLatitude = document.createElement("li");
            liLatitude.innerHTML = element.coordinates.lat;

            innerUl.appendChild(liLocation); 
            innerUl.appendChild(liDescription); 
            innerUl.appendChild(liLongtitude); 
            innerUl.appendChild(liLatitude);
            ul.appendChild(innerUl);
        });
    }

    get template() {
        return `
            <link rel="stylesheet" href="https://unpkg.com/bootstrap-material-design@4.1.1/dist/css/bootstrap-material-design.min.css"/>
            <style>
                #gameList {
                    width: 40%;
                }
                li.list-group-item:hover{
                    background-color: #009688;
                    color: white;
                    cursor: pointer;
                }
            </style>
            <ul id="gameList" class="list-group"></ul>
        `;
    }
}
customElements.define("cq-game-list", GameList);