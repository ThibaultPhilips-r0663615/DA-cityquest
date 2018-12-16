export default class CityQuestGameEngine {

    constructor(gameInstance, gameDetailsInstance){
        this.isGameDone = false;
        this.questionsDone = new Array();
        this.startTime = new Date();
        this.gameInstance = gameInstance;
        this.gameDetailsInstance = gameDetailsInstance;
        this.score = 0;
        this.duration = 0;
    }

    correctAnswer(answer, question){
        if(this.questionAlreadyDone(question) == false){
            if(answer == question.correctAnswer){
                this.score++;
            }
            this.questionsDone[this.questionsDone.length] = question;
            if(this.gameInstance.questions.length == this.questionsDone.length){
                this.gameDone();
            }
            this.gameDetailsInstance.setQuestionBeingHandled(false);
        }
    }

    getNextQuestion(coords){
        let questionToBeReturned;
        let questionFound = false;
        let i = 0;
        while((i < this.gameInstance.questions.length) && (questionFound == false)){
            let distance = this.getDistInMeter(this.gameInstance.questions[i].coordinates, coords);

            if(distance < 40000){
                if(this.questionAlreadyDone(this.gameInstance.questions[i]) == false){
                    //this.questionsDone[this.questionsDone.length] = this.gameInstance.questions[i];
                    questionFound = true;
                    questionToBeReturned = this.gameInstance.questions[i];
                }
            }
            i++;
        }
        return questionToBeReturned;
        
        /*
        this.gameInstance.questions.forEach(question => {
            let distance = this.getDistInMeter(question.coordinates, coords);
            let alreadyAsked = false;
            if(distance < 40000 && questionFound == false){
                for(let i = 0; i < this.questionsDone.length; i++){
                    if(this.questionsDone[i] == question){
                        alreadyAsked = true;
                    }
                }   
                if(alreadyAsked == false){
                    this.questionsDone[this.questionsDone.length] = question;
                    questionFound = true;
                    questionToBeReturned = question;
                }
            }
        });
        return questionToBeReturned;*/
    }

    questionAlreadyDone(question){
        let inList = false;
        this.questionsDone.forEach(element => {
            if(element == question){
                inList = true;
            }
        });
        return inList;
    }

    isGameDone(){
        return this.isGameDone;
    }

    gameDone(){
        this.endTime = new Date();
        var score = { gameId: this.gameInstance.id, startTime: this.startTime, endTime: this.endTime, answersCorrect: this.score};

        fetch("http://localhost:8080/scores",
        {
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(score)
        });

        fetch("http://localhost:8080/scores/" + this.gameInstance.id)
            .then(response => response.json())
            .then(json => this.showResult(json));
    }

    showResult(result){
        this.gameDetailsInstance.showGameResult(result);
    }

    getDuration(){
        this.duration = (this.endTime.getTime() - this.startTime.getTime()) / 1000;
        return this.duration;
    }

    getScore(){
        return this.score;
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