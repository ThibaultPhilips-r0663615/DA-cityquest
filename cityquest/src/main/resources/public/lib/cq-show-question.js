import AbstractCQElement from './cq-element.js';

class CityQuestShowQuestion extends AbstractCQElement{

    activateQuestion(question, gameEngineInstance,){
        this.question = question;
        this.gameEngineInstance = gameEngineInstance;

        this.isQuestionActive = true;
        this.showQuestion(question);
    }

    showQuestion(element){
        this.shadowRoot.innerHTML = this.questionTemplate;  // Why? html get erased after we call modal during previous question

        this.byId("QuestionTitle").innerHTML        = element.question;
        this.byId("QuestionLatitude").innerHTML     = element.coordinates.lat;
        this.byId("QuestionLongitude").innerHTML    = element.coordinates.lon;

        let answersDiv = this.byId("QuestionPossibleAnswers");
        let correctAnswerSelect = this.byId("QuestionAnswer");
        let count = 0;

        element.answers.forEach(element => {
            count++;
            answersDiv.appendChild(htmlToElement('<p>' + count + `: ` + element + '</p>'));
            correctAnswerSelect.appendChild(htmlToElement('<option>' + count + '</option>'));
        });

        this.byId("SendAnswer").addEventListener("click", () => this.sendAnswer());

        $(this.byId("QuestionModal")).modal();
    }

    sendAnswer(){
        let selectedAnswer = document.getElementById("QuestionAnswer").selectedIndex + 1;

        document.getElementById("QuestionModal").remove();
        this.isQuestionActive = false;

        this.gameEngineInstance.checkAnswer(selectedAnswer, this.question);
        if(this.gameEngineInstance.isGameDone) this.dispatchEvent(new Event("GameFinished"));
    }

    get questionTemplate () {
        return `
            <div id="QuestionModal" class="modal" tabindex="-1" role="dialog">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h4 class="modal-title" id="QuestionTitle"></h4>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <p class="question-detail-label">Latitude of the question: </p>     <p id="QuestionLatitude"></p> 
                            <p class="question-detail-label">Longitude of the question: </p>    <p id="QuestionLongitude"></p>
                            <p class="question-detail-label">All the possible answers: </p>     <div id="QuestionPossibleAnswers"></div>
                            <p class="question-detail-label">Select the correct answer.</p>     <select id="QuestionAnswer" multiple class="form-control"></select>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button id="SendAnswer" data-dismiss="modal" class="btn btn-primary">Send answer</button>
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
