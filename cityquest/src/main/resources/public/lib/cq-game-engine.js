export default class CityQuestGameEngine {

    constructor(gameInstance){
        this.questionsDone = [];
        this.startTime = new Date();
        this.gameInstance = gameInstance;

        this.score = 0;
    }

    checkAnswer(answer, question){
        if(!this.questionsDone.includes(question)){
            if(answer === question.correctAnswer) this.score++;

            this.questionsDone.push(question);
        }
    }

    getNextQuestion(coords){
        return this.gameInstance.questions.find(
            question => { return !this.questionsDone.includes(question) && this.getDistInMeter(question.coordinates, coords) < 50 }
        );
    }

    get isGameDone() {
        return this.gameInstance.questions.length === this.questionsDone.length;
    }

    fetchResult(){
        let score = { gameId: this.gameInstance.id, startTime: this.startTime, endTime: new Date(), answersCorrect: this.score};

        return fetch(backendUrl + "/scores",
        {
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(score)
        })
            .thenFetch(backendUrl + "/scores/" + this.gameInstance.id)
            .then(response => response.json());
    }

    get duration(){
        return (new Date().getTime() - this.startTime.getTime()) / 1000;
    }

    getDistInMeter(coordinates1, coordinates2){
        let R = 6371;
        let dLat = this.toRadians(coordinates2.latitude - coordinates1.lat);
        let dLon = this.toRadians(coordinates2.longitude - coordinates1.lon);

        let a =
            Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(this.toRadians(coordinates1.lat)) * Math.cos(this.toRadians(coordinates2.latitude)) *
            Math.sin(dLon/2) * Math.sin(dLon/2);

        let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

        return (R * c * 1000);
    }

    toRadians(degrees){
        return degrees * Math.PI / 100;
    }
}
