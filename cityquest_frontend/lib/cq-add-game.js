import { Game, Question, Coordinates } from "../model/modelClass.js";

var questions = new Array();
var answers = new Array();
var index = 0;
var indexAnswers = 0;

class CityQuestAddGame extends HTMLElement {

    connectedCallback() {
        this.initShadowDom();
    }

    initShadowDom() {
        let shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.innerHTML = this.template;
        this.startUpStylingAndAddFunctionality();
    }



    startUpStylingAndAddFunctionality(){
        let submitGame = this.shadowRoot.getElementById("submitGame");
        submitGame.onclick =() => this.submitGame();

        let numberOfQuestions = this.shadowRoot.getElementById("numberOfQuestions");
        numberOfQuestions.innerHTML = (index) + " questions in the game.";

        let questionForm = this.shadowRoot.getElementById("questionForm");
        questionForm.style.display = "none";
        
        let addQuestionButton = this.shadowRoot.getElementById("addQuestionButton");
        addQuestionButton.onclick =() => this.showQuestionForm(questionForm.id);

        let verifyQuestionButton = this.shadowRoot.getElementById("verifyQuestionButton");
        verifyQuestionButton.onclick =() => {
            this.addQuestionToList();
        }

        let numberOfAnswers = this.shadowRoot.getElementById("numberOfAnswers");
        numberOfAnswers.innerHTML = (indexAnswers) + " answers in the question.";

        let answerForm = this.shadowRoot.getElementById("answerForm");
        answerForm.style.display = "none";

        let addAnswerButton = this.shadowRoot.getElementById("addAnswerButton");
        addAnswerButton.onclick =() => this.showAnswerForm(answerForm.id);

        let verifyAnswerButton = this.shadowRoot.getElementById("verifyAnswerButton");
        verifyAnswerButton.onclick =() => this.addAnswersToList();

        let addAnotherGameButton = this.shadowRoot.getElementById("addAnotherGameButton");
        addAnotherGameButton.style.display = "none";
        let gameAdded = this.shadowRoot.getElementById("gameAdded");
        gameAdded.style.display = "none";
    }
    submitGame(){
        let inputName = this.shadowRoot.getElementById("inputName");
        let inputLocation = this.shadowRoot.getElementById("inputLocation");
        let inputDescription = this.shadowRoot.getElementById("inputDescription");
        let inputLongtitude = this.shadowRoot.getElementById("inputLongtitude");
        let inputLatitude = this.shadowRoot.getElementById("inputLatitude");

        var game = new Game(inputName.value, inputLocation.value, inputDescription.value, new Coordinates(Number.parseFloat(inputLongtitude.value), Number.parseFloat(inputLatitude.value)), questions);

        inputName.value = "";
        inputLocation.value = "";
        inputDescription.value = "";
        inputLongtitude.value = "";
        inputLatitude.value = "";

        index = 0;
        indexAnswers = 0;

        fetch("http://localhost:8080/games",
        {
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(game)
        })

        let form = this.shadowRoot.getElementById("formAddGame");
        form.style.display = "none";
        let addAnotherGameButton = this.shadowRoot.getElementById("addAnotherGameButton");
        addAnotherGameButton.style.display = "block";
        let gameAdded = this.shadowRoot.getElementById("gameAdded");
        gameAdded.style.display = "block";
    }
    showQuestionForm(id){
        let questionForm = this.shadowRoot.getElementById(id);
        if(questionForm.style.display == "none"){
            questionForm.style.display = "block";
        }
        else{
            questionForm.style.display = "none";
        }
    }
    showAnswerForm(id){
        let answerForm = this.shadowRoot.getElementById(id);
        if(answerForm.style.display == "none"){
            answerForm.style.display = "block";
        }
        else{
            answerForm.style.display = "none";
        }
    }
    addQuestionToList(){
        let question = this.shadowRoot.getElementById("inputQuestion");
        let extraInformation = this.shadowRoot.getElementById("inputExtraInformation");
        let longtitudeQuestion = this.shadowRoot.getElementById("inputLongtitudeQuestion");
        let latitudeQuestion = this.shadowRoot.getElementById("inpuLatitudeQuestion");
        let correctAnswer = this.shadowRoot.getElementById("inputCorrectAnswer");

        var questionObject = new Question(question.value, extraInformation.value, new Coordinates(longtitudeQuestion.value, latitudeQuestion.value), correctAnswer.value, answers);

        question.value = "";
        extraInformation.value = "";
        longtitudeQuestion.value = "";
        latitudeQuestion.value = "";
        correctAnswer.value = "";
        
        questions[index] = questionObject;
        index++;
        let numberOfQuestions = this.shadowRoot.getElementById("numberOfQuestions");
        numberOfQuestions.innerHTML = (index) + " questions in the game.";
        let questionForm = this.shadowRoot.getElementById("questionForm");
        questionForm.style.display = "none";

        indexAnswers = 0;
        answers = new Array();
        let numberOfAnswers = this.shadowRoot.getElementById("numberOfAnswers");
        numberOfAnswers.innerHTML = (indexAnswers) + " answers in the question.";
        let answerForm = this.shadowRoot.getElementById("answerForm");
        answerForm.style.display = "none";
        
    }
    addAnswersToList(){
        let answer = this.shadowRoot.getElementById("inputAnswer");

        answers[indexAnswers] = answer.value;
        indexAnswers++;
        answer.value = "";
        let numberOfAnswers = this.shadowRoot.getElementById("numberOfAnswers");
        numberOfAnswers.innerHTML = (indexAnswers) + " answers in the question.";
    }
    get template() {
        return `
            <link rel="stylesheet" href="https://unpkg.com/bootstrap-material-design@4.1.1/dist/css/bootstrap-material-design.min.css"/>
            <style>
                #formAddGame {
                    width: 40%;
                }
            </style>
            <h1>City Quest</h1>

            <h3>Add a game</h3>
            <div class="alert alert-success" role="alert" id="gameAdded">Game added succesfully.</div>
            <button onclick="window.location.href='addGameForm.html'" class="btn btn-primary" id="addAnotherGameButton">Add another game</button>

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
                    <label for="inputLongtitude">Longtitude</label>
                    <input type="text" class="form-control" id="inputLongtitude" placeholder="Enter a longtitude" aria-describedby="longtitudeHelp">
                    <small id="longtitudeHelp" class="form-text text-muted">Find the longtitude. (e.g. via google maps)</small>
                </div>
                <div class="form-group">
                    <label for="inputLatitude">Latitude</label>
                    <input type="text" class="form-control" id="inputLatitude" placeholder="Enter a latitude" aria-describedby="latitudeHelp">
                    <small id="latitudeHelp" class="form-text text-muted">Find the latitude. (e.g. via google maps)</small>
                </div>
                <div>
                    <label>Add questions: </label><br>
                    <button id="addQuestionButton" class="btn btn-primary" type="button">+</button>
                </div>
                <div id="questionForm">
                    <div class="form-group">
                        <label for="inputQuestion">Question</label>
                        <input class="form-control" id="inputQuestion" placeholder="Enter a question" name="inputQuestion">
                    </div>
                    <div class="form-group">
                        <label for="inputExtraInformation">Extra information</label>
                        <textarea class="form-control" id="inputExtraInformation" placeholder="Give some extra information" rows="10" cols="40"></textarea>
                    </div>
                    <div class="form-group">
                        <label for="inputLongtitudeQuestion">Longtitude </label>
                        <input type="text" class="form-control" id="inputLongtitudeQuestion" name="inputLongtitudeQuestion" placeholder="Enter a longtitude" aria-describedby="longtitudeHelpQuestion">
                        <small id="longtitudeHelpQuestion" class="form-text text-muted">Find the longtitude. (e.g. via google maps)</small>
                    </div>
                    <div class="form-group">
                        <label for="inpuLatitudeQuestion">Latitude</label>
                        <input type="text" class="form-control" id="inpuLatitudeQuestion" name="inpuLatitudeQuestion" placeholder="Enter a latitude" aria-describedby="latitudeHelpQueston">
                        <small id="latitudeHelpQuestion" class="form-text text-muted">Find the latitude. (e.g. via google maps)</small>
                    </div>
                    
                    <div>
                        <label>Add possible answers: </label><br>
                        <button id="addAnswerButton" class="btn btn-primary" type="button">+</button>
                    </div>
                    <div id="answerForm">
                        <div class="form-group">
                            <label for="inputAnswer">Answer </label>
                            <input class="form-control" id="inputAnswer" placeholder="Enter a possible answer" name="inputAnswer">
                        </div>
                    </div>
                    <button type="button" class="btn btn-primary" id="verifyAnswerButton">Verify answer</button>
                    <div class="alert alert-warning" role="alert" id="numberOfAnswers"></div>
                    <div class="form-group">
                        <label for="inputCorrectAnswer">Correct answer</label>
                        <input type="number" class="form-control" id="inputCorrectAnswer" name="inputCorrectAnswer" placeholder="Enter a number" aria-describedby="correctAnswerHelpQueston">
                        <small id="correctAnswerHelpQueston" class="form-text text-muted">Enter the index of the correct answer (starting from 0).</small>
                    </div>
                    <button type="button" class="btn btn-primary" id="verifyQuestionButton">Verify question</button>
                </div>
                <div class="alert alert-warning" role="alert" id="numberOfQuestions"></div>
                <button type="button" class="btn btn-primary" id="submitGame">Submit</button>
            </form>
        `;
    }
}
customElements.define("cq-add-game", CityQuestAddGame);