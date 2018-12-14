import AbstractCQElement from './cq-element.js';
import { Question, Coordinates } from './model/modelClass.js';

class GameQuestionEditor extends AbstractCQElement {

    init(gameInstance){
        this.gameInstance = gameInstance;
        this.showQuestion();
        this.initEventListeners();
    }

    showQuestion(){
        /*this.shadowRoot.getElementById("inputQuestion").innerHTML = question.question;
        this.shadowRoot.getElementById("inputExtraInformation").innerHTML = question.extraInformation;
        this.shadowRoot.getElementById("inpuLatitudeQuestion").innerHTML = question.coordinates.lat;
        this.shadowRoot.getElementById("inputLongtitudeQuestion").innerHTML = question.coordinates.lon;
        question.answers.foreach(answer => {
            this.createAnswerInput(answer);
        });
        this.shadowRoot.getElementById("inputCorrectAnswer").innerHTML = question.correctAnswer;  */      
    }

    initEventListeners(){
        this.shadowRoot.getElementById("addAnswerButton").addEventListener('click', () => this.addAnswerInput());
        this.shadowRoot.getElementById("verifyQuestionButton").addEventListener('click', () => this.verifyQuestion());
    }

    addAnswerInput(){
        let inputAnswer = htmlToElement('<input  type="text" class="form-control" placeholder="Possible answer">');
        //if(value){
        //    inputAnswer.value = value;
        //}
        this.shadowRoot.getElementById("answers").appendChild(inputAnswer);
    }

    verifyQuestion(){
        let answerArray = new Array();
        var answerList = this.shadowRoot.getElementById("answers");
        for(let i = 0; i < answerList.childElementCount; i++){
            if(answerList.children[i].value !== null && answerList.children[i].value != ""){
                answerArray.push(answerList.children[i].value);
            }
        }
        let question = new Question(this.shadowRoot.getElementById("inputQuestion").value, this.shadowRoot.getElementById("inputExtraInformation").value,
        new Coordinates(Number.parseFloat(this.shadowRoot.getElementById("inputLongtitudeQuestion").value), Number.parseFloat(this.shadowRoot.getElementById("inpuLatitudeQuestion").value)),
        (this.shadowRoot.getElementById("inputCorrectAnswer").value - 1), answerArray);   
        this.gameInstance.addQuestion(question); 
        this.gameInstance.deleteQuestionForm();
    }

    get template(){
        return `
            <link rel="stylesheet" href="https://unpkg.com/bootstrap-material-design@4.1.1/dist/css/bootstrap-material-design.min.css"/>
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
                    <label for="inpuLatitudeQuestion">Latitude</label>
                    <input type="text" class="form-control" id="inpuLatitudeQuestion" name="inpuLatitudeQuestion" placeholder="Enter a latitude" aria-describedby="latitudeHelpQueston">
                    <small id="latitudeHelpQuestion" class="form-text text-muted">Find the latitude. (e.g. via google maps)</small>
                </div>
                <div class="form-group">
                    <label for="inputLongtitudeQuestion">Longtitude </label>
                    <input type="text" class="form-control" id="inputLongtitudeQuestion" name="inputLongtitudeQuestion" placeholder="Enter a longtitude" aria-describedby="longtitudeHelpQuestion">
                    <small id="longtitudeHelpQuestion" class="form-text text-muted">Find the longtitude. (e.g. via google maps)</small>
                </div>
                <div id="answers">
                    <input type="text" class="form-control" placeholder="Possible answer">
                    <input type="text" class="form-control" placeholder="Possible answer">
                </div>
                <button type="button" class="btn btn-primary" id="addAnswerButton">+</button>
                <div class="form-group">
                    <label for="inputCorrectAnswer">Correct answer</label>
                    <input type="number" class="form-control" id="inputCorrectAnswer" name="inputCorrectAnswer" placeholder="Enter a number" min="1" aria-describedby="correctAnswerHelpQueston">
                    <small id="correctAnswerHelpQueston" class="form-text text-muted">Enter the index of the correct answer (starting from 1).</small>
                </div>
                <button type="button" class="btn btn-primary" id="verifyQuestionButton">Verify question</button>
            </div>`;
    }

}
customElements.define('cq-question-editor', GameQuestionEditor);