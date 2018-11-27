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
        let innerUl = this.shadowRoot.getElementById((id + "Ul"));
        let outerLi = this.shadowRoot.getElementById((id + "Li"));
        let innerButton = this.shadowRoot.getElementById((id + "Button"));
        if(innerUl.style.display == "none"){
            innerUl.style.display = "block";
            outerLi.style.background = "#009688"
            outerLi.style.color = "white";
            innerButton.style.color = "black";
            innerButton.style.backgroundColor = "#FAFAFA";
        }
        else{
            innerUl.style.display = "none";
            outerLi.style.background = "#FAFAFA";
            outerLi.style.color = "black";
            innerButton.style.color = "white";
            innerButton.style.backgroundColor = "#009688";
        }
    }
    changeStyleMouseOver(id){
        let outerLi = this.shadowRoot.getElementById((id + "Li"));
        let innerButton = this.shadowRoot.getElementById((id + "Button"));

        outerLi.style.background = "#009688"
        outerLi.style.color = "white";
        innerButton.style.color = "black";
        innerButton.style.backgroundColor = "#FAFAFA";
    }
    changeStyleMouseOut(id){
        let innerUl = this.shadowRoot.getElementById((id + "Ul"));
        let outerLi = this.shadowRoot.getElementById((id + "Li"));
        let innerButton = this.shadowRoot.getElementById((id + "Button"));

        if(innerUl.style.display == "none"){
            outerLi.style.background = "#FAFAFA";
            outerLi.style.color = "black";
            innerButton.style.color = "white";
            innerButton.style.backgroundColor = "#009688";
        }
    }
    showGameList(json){
        let ul = this.shadowRoot.querySelector("#gameList");
        json.forEach(element => {
            let liName = document.createElement("li");
            liName.className = "list-group-item";
            liName.id = (element.id + "Li");
            liName.style.display = "flex";
            liName.style.justifyContent = "space-between";
            let pName = document.createElement("p");
            pName.innerHTML = element.name;
            let button = document.createElement("button");
            button.innerHTML = "Play";
            button.id = (element.id + "Button");
            button.type = "button";
            button.addEventListener("click", function(e){
                e.stopPropagation();
                window.location.href = ("gameDetails.html?id=" + element.id);
            });
            liName.appendChild(pName);
            liName.appendChild(button);
            liName.onclick =() => this.displayDetails(element.id);
            liName.onmouseover =() => this.changeStyleMouseOver(element.id);
            liName.onmouseout =() => this.changeStyleMouseOut(element.id);
            ul.appendChild(liName);

            let innerUl = document.createElement("ul");
            innerUl.id = (element.id + "Ul");
            innerUl.style.display = "none";
            innerUl.style.listStyleType = "none";
            let pLocation = document.createElement("p");
            pLocation.innerHTML = "Location";
            let liLocation = document.createElement("li");
            liLocation.innerHTML = element.location;
            let pDescription = document.createElement("p");
            pDescription.innerHTML = "Description";
            let liDescription = document.createElement("li");
            liDescription.innerHTML = element.description;
            let pLongtitude = document.createElement("p");
            pLongtitude.innerHTML = "Longtitude";
            let liLongtitude = document.createElement("li");
            liLongtitude.innerHTML = element.coordinates.lon;
            let pLatitude = document.createElement("p");
            pLatitude.innerHTML = "Latitude";
            let liLatitude = document.createElement("li");
            liLatitude.innerHTML = element.coordinates.lat;

            innerUl.appendChild(pLocation);
            innerUl.appendChild(liLocation);
            innerUl.appendChild(pDescription); 
            innerUl.appendChild(liDescription);
            innerUl.appendChild(pLongtitude);
            innerUl.appendChild(liLongtitude);
            innerUl.appendChild(pLatitude); 
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
                    cursor: pointer;
                }
                #gameList > ul > p {
                    margin-top: 3%;
                    text-decoration: underline;
                    text-decoration-color: #009688;
                }
                #gameList > ul > li {
                    margin-bottom: 7%;
                }
                #gameList > ul {
                    border: 3px solid #009688;
                }
                #gameList > li > button {
                    background-color: #009688; 
                    float: right;
                    border: none;
                    color: white;
                    padding: 5px 15px;
                    text-align: center;
                    text-decoration: none;
                    display: inline-block;
                    cursor: pointer;
                    text-size: 10px;
                }
            </style>
            <h3>Games</h3>
            <ul id="gameList" class="list-group"></ul>
        `;
    }
}
customElements.define("cq-game-list", GameList);