import AbstractCQElement from './cq-element.js';

class CityQuestResultScreen extends AbstractCQElement {

    showResult(gameEngine){
        gameEngine.fetchResult().then( result => {
            this.shadowRoot.innerHTML = this.resultTemplate;

            this.byId('GameDuration').innerHTML         = gameEngine.duration + 's';
            this.byId('GameScore').innerHTML            = gameEngine.score;
            this.byId('GameDurationAverage').innerHTML  = result.averageDurationInSeconds + 's';
            this.byId('GameScoreAverage').innerHTML     = result.averageAnswersCorrect;

            this.byId("backButton").addEventListener("click", () => {
                document.getElementById("ResultScreenModal").remove();
                this.app.router.navigate('/home')
            });

            $(this.shadowRoot.getElementById("ResultScreenModal")).modal('show');
        });
    }

    get resultTemplate() {
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
                            <p class="question-detail-label">Average duration till the game was done: </p>  <p id="GameDurationAverage"> Loading ... </p> 
                            <p class="question-detail-label">Average score: </p>                            <p id="GameScoreAverage"> Loading ... </p>
                            <p class="question-detail-label">Your duration: </p>                            <p id="GameDuration"> Loading ... </p> 
                            <p class="question-detail-label">Your score: </p>                               <p id="GameScore"> Loading ... </p>
                        </div>
                        <div class="modal-footer">
                            <button id="backButton" data-dismiss="modal" class="btn btn-primary">Back</button>
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
customElements.define('cq-result-screen', CityQuestResultScreen);
