import { Game, Coordinates } from "./model/modelClass.js";
import AbstractCQElement from './cq-element.js';
import './cq-question-editor.js';

let questions = [];

class CityQuestAddGame extends AbstractCQElement {

    init(){
        this.showQuestionCount();
        this.initEventListeners();
    }

    showQuestionCount(){
        this.byId("numberOfQuestions").innerHTML = (questions.length) + " questions in the game.";
    }

    toggleVisibility(){
        this.byId('formAddGame').classList.toggle('invisible');
        this.byId('gameAdded').classList.toggle('invisible');
        this.byId('addAnotherGameButton').classList.toggle('invisible');
    }

    initEventListeners(){
        this.byId("addQuestionButton").addEventListener('click', () => this.byId('questionEditor').show());
        this.byId("submitGame").addEventListener('click', () => this.submitGame());
        this.byId("addAnotherGameButton").addEventListener('click', () => { this.showQuestionCount(); this.toggleVisibility(); });
        this.byId("questionEditor").addEventListener('QuestionCreated', () => this.addQuestion());
    }

    addQuestion(){
        let questionEditor = this.byId('questionEditor');
        questions.push(questionEditor.question);
        questionEditor.hide();

        this.showQuestionCount();
    }

    submitGame(){
        let game = new Game(
            this.byId("inputName").value,
            this.byId("inputLocation").value,
            this.byId("inputDescription").value,
            new Coordinates(
                Number.parseFloat(this.byId("inputLongitude").value),
                Number.parseFloat(this.byId("inputLatitude").value)
            ),
            questions
        );

        this.byId("inputName").value = "";
        this.byId("inputLocation").value = "";
        this.byId("inputDescription").value = "";
        this.byId("inputLongitude").value = "";
        this.byId("inputLatitude").value = "";

        questions = [];

        fetch(backendUrl + "/games",
        {
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(game)
        });

        this.toggleVisibility();
    }

    get template() {
        return `
            <link rel="stylesheet" href="https://unpkg.com/bootstrap-material-design@4.1.1/dist/css/bootstrap-material-design.min.css"/>
            <link rel="stylesheet" href="../css/style.css"/>
            
            <h1>City Quest</h1>

            <h3>Add a game</h3>
            <div class="alert alert-success invisible" role="alert" id="gameAdded">Game added succesfully.</div>
            <button class="btn btn-primary invisible" id="addAnotherGameButton">Add another game</button>

            <form id="formAddGame">
                <div class="form-group">
                    <label for="inputName">Name</label>
                    <input type="text" class="form-control" id="inputName" placeholder="Enter the name of the game">
                </div>
                <div class="form-group">
                    <label for="inputLocation">Location</label>
                    <input type="text" class="form-control" id="inputLocation" placeholder="Enter location">
                </div>
                <div class="form-group">
                    <label for="inputDescription">Description</label>
                    <textarea class="form-control" id="inputDescription" placeholder="Enter a description" name="inputDescription" rows="10" cols="40"></textarea>
                </div>
                <div class="form-group">
                    <label for="inputLatitude">Latitude</label>
                    <input type="text" class="form-control" id="inputLatitude" placeholder="Enter a latitude" aria-describedby="latitudeHelp">
                    <small id="latitudeHelp" class="form-text text-muted">Find the latitude. (e.g. via google maps)</small>
                </div>
                <div class="form-group">
                    <label for="inputLongitude">Longitude</label>
                    <input type="text" class="form-control" id="inputLongitude" placeholder="Enter a longitude" aria-describedby="longitudeHelp">
                    <small id="longitudeHelp" class="form-text text-muted">Find the longitude. (e.g. via google maps)</small>
                </div>
                <div>
                    <label>Add questions: </label><br>
                    <button id="addQuestionButton" class="btn btn-primary" type="button">+</button>
                </div>
                
                <cq-question-editor id="questionEditor"></cq-question-editor>
                
                <div class="alert alert-warning" role="alert" id="numberOfQuestions"></div>
                
                <button type="button" class="btn btn-primary" id="submitGame">Submit</button>
            </form>
        `;
    }
}
customElements.define("cq-add-game", CityQuestAddGame);
