import AbstractCQElement from './cq-element.js';

class GameRating extends AbstractCQElement {

    init(gameId, emailElement) {
        this.byId("send").addEventListener('click', () => this.sendRating(gameId, emailElement));
    }

    sendRating(gameId, emailElement) {
        let rating = {
            ratedItem : gameId,
            emailAddress : emailElement.value,
            rating : (this.byId("rating").selectedIndex + 1)
        };

        fetch(recommendationUrl + "/recommend",
            {
                method: "POST",
                headers:{
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(rating)
            }).then(() => this.byId("feedback").innerHTML = `Rating sent!`);
    }

    get template() {
        return `
            <link rel="stylesheet" href="https://unpkg.com/bootstrap-material-design@4.1.1/dist/css/bootstrap-material-design.min.css"/>
            <link rel="stylesheet" href="./css/style.css"/>

            <select id="rating">
                <option>1 Star</option>
                <option>2 Stars</option>
                <option>3 Stars</option>
                <option>4 Stars</option>
                <option>5 Stars</option>
            </select>
            <button id="send">Send rating</button>
            <p id="feedback"></p>
        `;
    }

}
customElements.define("cq-game-rating", GameRating);
