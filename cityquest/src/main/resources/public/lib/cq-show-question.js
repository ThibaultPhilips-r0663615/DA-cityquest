import AbstractCQElement from './cq-element.js';

class CityQuestShowQuestion extends AbstractCQElement{

    activateQuestion(question, gameEngine,){
        this.question = question;
        this.gameEngine = gameEngine;

        this.isQuestionActive = true;
        this.showQuestion(question);
    }

    showQuestion(question){
        this.shadowRoot.innerHTML = this.questionTemplate;  // Why? html get erased after we call modal during previous question

        this.byId("QuestionTitle").innerHTML        = question.question;
        this.byId("QuestionLatitude").innerHTML     = question.coordinates.lat;
        this.byId("QuestionLongitude").innerHTML    = question.coordinates.lon;
        this.byId("ExtraInformation").innerHTML     = question.extraInformation;

        let answersDiv = this.byId("QuestionPossibleAnswers");
        let correctAnswerSelect = this.byId("QuestionAnswer");
        let count = 0;

        question.answers.forEach(element => {
            count++;
            answersDiv.appendChild(htmlToElement('<p>' + count + `: ` + element + '</p>'));
            correctAnswerSelect.appendChild(htmlToElement('<option>' + count + '</option>'));
        });

        this.byId("SendAnswer").addEventListener("click", () => this.sendAnswer());
        this.byId("CloseQuestion").addEventListener('click', () => this.closeQuestion());

        $(this.byId("QuestionModal")).modal();
    }

    sendAnswer(){
        let selectedAnswer = document.getElementById("QuestionAnswer").selectedIndex + 1;

        if(this.gameEngine.checkAnswer(selectedAnswer, this.question)){
            document.getElementById('Result').innerHTML = `Correct answer`;
        } else {
            document.getElementById('Result').innerHTML = `Wrong answer`;
        }

        document.querySelectorAll('.modal-body, .modal-footer > button')
            .forEach(element => element.classList.toggle('invisible'));
    }

    closeQuestion(){
        document.getElementById("QuestionModal").remove();
        this.isQuestionActive = false;
        if(this.gameEngine.isGameDone) this.dispatchEvent(new Event("GameFinished"));
    }

    get questionTemplate () {
        return `
            <div id="QuestionModal" class="modal" tabindex="-1" role="dialog">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h4 class="modal-title" id="QuestionTitle"></h4>
                        </div>
                        <div class="modal-body">
                            <p class="question-detail-label">Latitude of the question: </p>     <p id="QuestionLatitude"></p> 
                            <p class="question-detail-label">Longitude of the question: </p>    <p id="QuestionLongitude"></p>
                            <p class="question-detail-label">All the possible answers: </p>     <div id="QuestionPossibleAnswers"></div>
                            <p class="question-detail-label">Select the correct answer.</p>     <select id="QuestionAnswer" multiple class="form-control"></select>
                        </div>
                        <div class="modal-body invisible">
                            <p><b>Result</b></p>                   <p id="Result"></p>
                            <p><b>Extra information:</b></p>       <p id="ExtraInformation"></p>
                        </div>
                        <div class="modal-footer">
                            <button id="SendAnswer" class="btn btn-primary">Send answer</button>
                            <button id="CloseQuestion" data-dismiss="modal" class="btn btn-primary invisible">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    get template() {
        return ``;
    }

}
customElements.define('cq-show-question', CityQuestShowQuestion);
