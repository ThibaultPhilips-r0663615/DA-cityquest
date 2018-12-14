export default class CityQuestGameEngine {

    constructor(gameInstance){
        this.questionsDone = new Array();
        this.startTime = new Date();
        this.gameInstance = gameInstance;
        this.score = 0;
        this.index = 0;
    }

    correctAnswer(answer, index){
        if(answer == gameInstance.questions[index].correctAnswer){
            this.score++;
        }
    }

    getNextQuestion(coords){
        let questionToBeReturned;
        this.gameInstance.questions.forEach(question => {
            let distance = this.getDistInMeter(question.coordinates, coords);
            let alreadyAsked = false;
            if(distance < 20000){
                for(let i = 0; i < this.questionsDone.length; i++){
                    if(this.questionsDone[i] == question){
                        alreadyAsked = true;
                    }
                }
                if(alreadyAsked == false){
                    this.questionsDone[this.questionsDone.length] = question;
                    questionToBeReturned = question;
                }
            }
        });
        return questionToBeReturned;
    }

    gameDone(){
        this.endTime = new Date();
        var score = { gameId: this.gameInstance.id, startTime: this.startTime, endTime: this.endTime, answersCorrect: this.score};
        alert(JSON.stringify(score));

        fetch("http://localhost:8080/scores",
        {
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(score)
        })
    }

    getDistInMeter(coordinates1, coordinates2){
        let R = 6371;
        let dLat = this.toRadians(coordinates2.latitude - coordinates1.lat);
        let dLon = this.toRadians(coordinates2.longitude - coordinates1.lon);

        let a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                   Math.cos(this.toRadians(coordinates1.lat)) * Math.cos(this.toRadians(coordinates2.latitude)) *
                   Math.sin(dLon/2) * Math.sin(dLon/2);

        let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

        return (R * c * 1000);
    }

    toRadians(degrees){
        return degrees * Math.PI / 100;
    }
}