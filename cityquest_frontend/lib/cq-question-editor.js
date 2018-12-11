var indexAnswers = 0;

class GameQuestionEditor extends HTMLElement {

    init(question){
        let numberOfAnswers = this.shadowRoot.getElementById("numberOfAnswers");
        numberOfAnswers.innerHTML = (indexAnswers) + " answers in the question.";
        this.showQuestion(question);
        this.initEventListeners();
    }

    showQuestion(question){
        this.shadowRoot.getElementById("inputQuestion").innerHTML = question.question;
        this.shadowRoot.getElementById("inputExtraInformation").innerHTML = question.extraInformation;
        this.shadowRoot.getElementById("inpuLatitudeQuestion").innerHTML = question.lat;
        this.shadowRoot.getElementById("inputLongtitudeQuestion").innerHTML = question.lon;
        question.answers.foreach(answer => {
            this.createAnswerInput(answer);
        });
        this.shadowRoot.getElementById("inputCorrectAnswer").innerHTML = question.correctAnswer;        
    }

    initEventListeners(){
        this.shadowRoot.getElementById("verifyAnswerButton").addEventListener('click', () => this.createAnswerInput());
        this.shadowRoot.getElementById("verifyQuestionButton").addEventListener('click', () => this.validateAndSaveQuestion());
    }

    createAnswerInput(value){
        let inputAnswer = htmlToElement('<input  type="text" class="form-control" placeholder="Possible answer">');
        if(value){
            inputAnswer.value = value;
        }
        this.shadowRoot.getElementById("answers").appendChild(inputAnswer);
        this.shadowRoot.getElementById("numberOfAnswers").innerHTML = indexAnswers;
        indexAnswers++;
    }

    validateAndSaveQuestion(){
        return;
    }

    get template(){
        return `
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
                    <input type="text" class="form-control" placeholder="Possible answer 1">
                    <input type="text" class="form-control" placeholder="Possible answer 2">
                </div>
                <button type="button" class="btn btn-primary" id="verifyAnswerButton">Add answer</button>
                <div class="alert alert-warning" role="alert" id="numberOfAnswers"></div>
                <div class="form-group">
                    <label for="inputCorrectAnswer">Correct answer</label>
                    <input type="number" class="form-control" id="inputCorrectAnswer" name="inputCorrectAnswer" placeholder="Enter a number" min="1" aria-describedby="correctAnswerHelpQueston">
                    <small id="correctAnswerHelpQueston" class="form-text text-muted">Enter the index of the correct answer (starting from 1).</small>
                </div>
                <button type="button" class="btn btn-primary" id="verifyQuestionButton">Verify question</button>
            </div>
            <div class="alert alert-warning" role="alert" id="numberOfQuestions"></div>`;
    }

}
customElements.define('cq-question-editor', GameQuestionEditor);