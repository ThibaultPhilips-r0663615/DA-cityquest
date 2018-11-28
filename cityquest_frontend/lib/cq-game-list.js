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
        let outerUl = this.shadowRoot.querySelector("#gameList");
        json.forEach(element => {
            let outerLi = document.createElement("li");
            outerLi.className = "list-group-item";
            outerLi.id = (element.id + "Li");
            outerLi.style.display = "flex";
            outerLi.style.justifyContent = "space-between";
            let outerLiGameNameP = document.createElement("p");
            outerLiGameNameP.innerHTML = element.name;
            let outerLiGameLocationP = document.createElement("p");
            outerLiGameLocationP.innerHTML = "[" + element.location + "]";
            let outerLiPlayButton = document.createElement("button");
            outerLiPlayButton.innerHTML = "Play";
            outerLiPlayButton.id = (element.id + "Button");
            outerLiPlayButton.type = "button";
            outerLiPlayButton.addEventListener("click", function(e){
                e.stopPropagation();
                window.location.href = ("gameDetails.html?id=" + element.id);
            });
            outerLi.appendChild(outerLiGameNameP);
            outerLi.appendChild(outerLiGameLocationP);
            outerLi.appendChild(outerLiPlayButton);
            outerLi.onclick =() => this.displayDetails(element.id);
            outerLi.onmouseover =() => this.changeStyleMouseOver(element.id);
            outerLi.onmouseout =() => this.changeStyleMouseOut(element.id);
            outerUl.appendChild(outerLi);

            let innerUl = document.createElement("ul");
            innerUl.id = (element.id + "Ul");
            innerUl.style.display = "none";
            innerUl.style.listStyleType = "none";
            let innerUlGameLocationP = document.createElement("p");
            innerUlGameLocationP.innerHTML = "Location";
            let innerUlGameLocationLi = document.createElement("li");
            innerUlGameLocationLi.innerHTML = element.location;
            let innerUlGameDescriptionP = document.createElement("p");
            innerUlGameDescriptionP.innerHTML = "Description";
            let innerUlGameDescriptionLi = document.createElement("li");
            innerUlGameDescriptionLi.innerHTML = element.description;
            let innerUlGameLongtitudeP = document.createElement("p");
            innerUlGameLongtitudeP.innerHTML = "Longtitude";
            let innerUlGameLongtitudeLi = document.createElement("li");
            innerUlGameLongtitudeLi.innerHTML = element.coordinates.lon;
            let innerUlGameLatitudeP = document.createElement("p");
            innerUlGameLatitudeP.innerHTML = "Latitude";
            let innerUlGameLatitudeLi = document.createElement("li");
            innerUlGameLatitudeLi.innerHTML = element.coordinates.lat;

            innerUl.appendChild(innerUlGameLocationP);
            innerUl.appendChild(innerUlGameLocationLi);
            innerUl.appendChild(innerUlGameDescriptionP); 
            innerUl.appendChild(innerUlGameDescriptionLi);
            innerUl.appendChild(innerUlGameLongtitudeP);
            innerUl.appendChild(innerUlGameLongtitudeLi);
            innerUl.appendChild(innerUlGameLatitudeP); 
            innerUl.appendChild(innerUlGameLatitudeLi);
            outerUl.appendChild(innerUl);
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