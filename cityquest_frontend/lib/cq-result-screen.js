import AbstractCQElement from './cq-element.js';

class CityQuestResultScreen extends AbstractCQElement {

    init(result, gameEngineInstance){
        this.result = result;
        this.gameEngineInstance = gameEngineInstance;
        this.showResult();
        this.initEventListeners();
    }

    showResult(){
        this.shadowRoot.getElementById('GameDurationAverage').innerHTML = this.result.averageDurationInSeconds + 's';
        this.shadowRoot.getElementById('GameScoreAverage').innerHTML = this.result.averageAnswersCorrect;
        this.shadowRoot.getElementById('GameDuration').innerHTML = this.gameEngineInstance.getDuration() + 's';
        this.shadowRoot.getElementById('GameScore').innerHTML = this.gameEngineInstance.getScore();
        $(this.shadowRoot.getElementById("ResultScreenModal")).modal('show');
    }

    initEventListeners(){
        document.addEventListener('click',function(e){
            if(e.target && e.target.id== 'backButton'){
                $(this.shadowRoot.getElementById("ResultScreenModal")).modal('dispose');
                this.app.router.navigate('/home');
            }
        }.bind(this));
    }

    get template() {
        return `
            <div id="ResultScreenModal" class="modal" tabindex="-1" role="dialog">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title">Result:</h4>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <p class="question-detail-label">Average duration till the game was done: </p>
                        <p id="GameDurationAverage"></p> 
                        <p class="question-detail-label">Average score: </p>
                        <p id="GameScoreAverage"></p>
                        <p class="question-detail-label">Your duration: </p>
                        <p id="GameDuration"></p> 
                        <p class="question-detail-label">Your score: </p>
                        <p id="GameScore"></p>
                    </div>
                    <div class="modal-footer">
                        <button id="backButton" data-dismiss="modal" class="btn btn-primary">Back</button>
                    </div>
                    </div>
                </div>
            </div>
        `;
    }
}
customElements.define('cq-result-screen', CityQuestResultScreen);