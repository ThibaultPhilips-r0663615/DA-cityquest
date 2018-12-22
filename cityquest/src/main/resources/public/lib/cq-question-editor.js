import AbstractCQElement from './cq-element.js';
import { Question, Coordinates } from './model/modelClass.js';

class GameQuestionEditor extends AbstractCQElement {

    show(){
        this.shadowRoot.innerHTML = this.questionEditorTemplate;
        this.initEventListeners();
    }

    hide(){
        this.shadowRoot.innerHTML = ``;
    }

    initEventListeners(){
        this.byId("addAnswerButton").addEventListener('click', () => this.addAnswerInputField());
        this.byId("verifyQuestionButton").addEventListener('click', () => this.verifyQuestion());
    }

    addAnswerInputField(){
        this.byId('answers').appendChild(htmlToElement(`
            <input type="text" class="form-control" placeholder="Possible answer">`
        ));
    }

    verifyQuestion(){
        let answers = Array
            .from(
                this.byId("answers").children,
                child => child.value
            )
            .filter(answer => answer !== null && answer !== "");

        this.question = new Question(
            this.byId("inputQuestion").value,
            this.byId("inputExtraInformation").value,
            new Coordinates(
                this.byId("inputLongitudeQuestion").value,
                this.byId("inputLatitudeQuestion").value
            ),
            this.byId("inputCorrectAnswer").value,
            answers
        );

        this.dispatchEvent(new Event("QuestionCreated"));
    }

    get questionEditorTemplate(){
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
                    <label for="inputLatitudeQuestion">Latitude</label>
                    <input type="text" class="form-control" id="inputLatitudeQuestion" name="inputLatitudeQuestion" placeholder="Enter a latitude" aria-describedby="latitudeHelpQuestion">
                    <small id="latitudeHelpQuestion" class="form-text text-muted">Find the latitude. (e.g. via google maps)</small>
                </div>
                <div class="form-group">
                    <label for="inputLongitudeQuestion">Longtitude </label>
                    <input type="text" class="form-control" id="inputLongitudeQuestion" name="inputLongitudeQuestion" placeholder="Enter a longitude" aria-describedby="longitudeHelpQuestion">
                    <small id="longitudeHelpQuestion" class="form-text text-muted">Find the longitude. (e.g. via google maps)</small>
                </div>
                <div id="answers">
                    <input type="text" class="form-control" placeholder="Possible answer">
                    <input type="text" class="form-control" placeholder="Possible answer">
                </div>
                <button type="button" class="btn btn-primary" id="addAnswerButton">+</button>
                <div class="form-group">
                    <label for="inputCorrectAnswer">Correct answer</label>
                    <input type="number" class="form-control" id="inputCorrectAnswer" name="inputCorrectAnswer" placeholder="Enter a number" min="1" aria-describedby="correctAnswerHelpQueston">
                    <small id="correctAnswerHelpQuestion" class="form-text text-muted">Enter the index of the correct answer (starting from 1).</small>
                </div>
                <button type="button" class="btn btn-primary" id="verifyQuestionButton">Verify question</button>
            </div>`;
    }

    get template() {
        return ``;
    }

}
customElements.define('cq-question-editor', GameQuestionEditor);