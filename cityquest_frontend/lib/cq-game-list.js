import { htmlToElement } from './util/util.js';

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
        let outerUl = this.shadowRoot.querySelector("#gameList");
        json.forEach(element => {
            let outerLi = htmlToElement('<li class="list-group-item" id="' + (element.id + "Li") + '"></li>');
            outerLi.style.display = "flex";
            outerLi.style.justifyContent = "space-between";
            outerLi.onclick =() => this.displayDetails(element.id);
            outerLi.onmouseover =() => this.changeStyleMouseOver(element.id);
            outerLi.onmouseout =() => this.changeStyleMouseOut(element.id);

            let outerLiGameNameP = htmlToElement('<p>' + element.name + '</p>');
            let outerLiGameLocationP = htmlToElement('<p>[' + element.location + ']</p>');
        
            let outerLiPlayButton = htmlToElement('<button id="' + (element.id + "Button") + '" type="button">Play</button>');
            outerLiPlayButton.addEventListener("click", function(e){
                e.stopPropagation();
                window.location.href = ("gameDetails.html?id=" + element.id);
            });

            outerLi.appendChild(outerLiGameNameP);
            outerLi.appendChild(outerLiGameLocationP);
            outerLi.appendChild(outerLiPlayButton);
            outerUl.appendChild(outerLi);

            let innerUl = htmlToElement('<ul id="' + (element.id + "Ul") + '"></ul>');
            innerUl.style.display = "none";
            innerUl.style.listStyleType = "none";
            let innerUlGameLocationP = htmlToElement('<p>Location:</p>');
            let innerUlGameLocationLi = htmlToElement('<li>' + element.location + '</li>');
            let innerUlGameDescriptionP = htmlToElement('<p>Description:</p>');
            let innerUlGameDescriptionLi = htmlToElement('<li>' + element.description + '</li>');
            let innerUlGameLatitudeP = htmlToElement('<p>Latitude:</p>');
            let innerUlGameLatitudeLi = htmlToElement('<li>' + element.coordinates.lat + '</li>');
            let innerUlGameLongtitudeP = htmlToElement('<p>Longitude:</p>');
            let innerUlGameLongtitudeLi = htmlToElement('<li>' + element.coordinates.lon + '</li>');

            innerUl.appendChild(innerUlGameLocationP); innerUl.appendChild(innerUlGameLocationLi);
            innerUl.appendChild(innerUlGameDescriptionP); innerUl.appendChild(innerUlGameDescriptionLi);
            innerUl.appendChild(innerUlGameLatitudeP); innerUl.appendChild(innerUlGameLatitudeLi);
            innerUl.appendChild(innerUlGameLongtitudeP); innerUl.appendChild(innerUlGameLongtitudeLi);
            outerUl.appendChild(innerUl);
        });
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