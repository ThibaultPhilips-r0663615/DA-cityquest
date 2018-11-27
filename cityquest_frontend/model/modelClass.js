export function Question(question, extraInformation, coordinates, correctAnswer, answers){
    this.question = question;
    this.extraInformation = extraInformation;
    this.coordinates = coordinates;
    this.correctAnswer = correctAnswer;
    this.answers = answers;
}

export function Coordinates(lon, lat){
    this.lon = lon;
    this.lat = lat;
}

export function Game(name, location, description, coordinates, questions){
    this.name = name;
    this.location = location;
    this.description = description;
    this.coordinates = coordinates;
    this.questions = questions;
}