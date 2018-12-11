import AbstractCQElement from './cq-element.js'

class CityQuestShowQuestion extends AbstractCQElement{

    init(element, parent){
        this.showQuestion(element);
        this.initEventListeners(parent);
    }

    showQuestion(element){
        this.shadowRoot.getElementById("QuestionTitle").innerHTML = element.question;
        this.shadowRoot.getElementById("QuestionLatitude").innerHTML = element.coordinates.lat;
        this.shadowRoot.getElementById("QuestionLongitude").innerHTML = element.coordinates.lon;
        let answersDiv = this.shadowRoot.getElementById("QuestionPossibleAnswers");
        let correctAnswerSelect = this.shadowRoot.getElementById("QuestionAnswer");
        let count = 1;
        answersDiv.innerHTML = "";
        element.answers.forEach(element => {
            let answer = document.createElement("p");
            answer.innerHTML = element;
            answersDiv.appendChild(answer);
            let option = document.createElement("option");
            option.innerHTML = count;
            correctAnswerSelect.appendChild(option);
            count++;
        });
        //let sendButton = this.shadowRoot.getElementById("SendAnswer");
        //sendButton.onclick =() => this.sendAnswer();
        $(this.shadowRoot.getElementById("QuestionModal")).modal('show');
    }

    sendAnswer(){
        let selectedAnswer = document.getElementById("QuestionAnswer");
        return selectedAnswer.options[selectedAnswer.selectedIndex].text;
    }

    initEventListeners(parent){
        document.getElementById("QuestionAnswer").addEventListener('click', () => this.sendAnswer());
    }

    get template (){
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
                        <p class="question-detail-label">Latitude of the question: </p>
                        <p id="QuestionLatitude"></p> 
                        <p class="question-detail-label">Longitude of the question: </p>
                        <p id="QuestionLongitude"></p>
                        <p class="question-detail-label">All the possible answers: </p>
                        <div id="QuestionPossibleAnswers">
                        </div>
                        <p class="question-detail-label">Select the correct answer.</p>
                        <select multiple class="form-control" id="QuestionAnswer">
                        </select>
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

}
customElements.define('cq-show-question', CityQuestShowQuestion);