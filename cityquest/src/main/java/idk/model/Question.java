package idk.model;

import java.util.ArrayList;
import java.util.List;

public class Question {
    private String question, extraInformation;
    private Coordinates coordinates;
    private int correctAnswer;
    private List<String> answers = new ArrayList<>();

    public Question(){

    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public void setCorrectAnswer(int correctAnswer) {
        this.correctAnswer = correctAnswer;
    }

    public void setCoordinates(Coordinates coordinates) {
        this.coordinates = coordinates;
    }

    public void setAnswers(List<String> answers) {
        this.answers = answers;
    }

    public void setExtraInformation(String extraInformation) {
        this.extraInformation = extraInformation;
    }

    public String getQuestion() {
        return question;
    }

    public int getCorrectAnswer() {
        return correctAnswer;
    }

    public Coordinates getCoordinates() {
        return coordinates;
    }

    public List<String> getAnswers() {
        return answers;
    }

    public String getExtraInformation() {
        return extraInformation;
    }
    
    public static class QuestionBuilder{
        private String question, extraInfo;
        private Coordinates coordinates;
        private int correctAnswer;
        private List<String> answer = new ArrayList<>();

        private QuestionBuilder(){

        }

        public QuestionBuilder withQuestion(String question) {
            this.question = question;
            return this;
        }

        public QuestionBuilder withCorrectAnswer(int correctAnswer) {
            this.correctAnswer = correctAnswer;
            return this;
        }

        public QuestionBuilder withCoordinates(Coordinates coordinates) {
            this.coordinates = coordinates;
            return this;
        }

        public QuestionBuilder withCoordinates(double longitude, double latitude) {
            this.coordinates = new Coordinates(longitude, latitude);
            return this;
        }

        public QuestionBuilder withAnswer(List<String> answer) {
            this.answer = answer;
            return this;
        }

        public QuestionBuilder withAnswer(String answer) {
            this.answer.add(answer);
            return this;
        }

        public QuestionBuilder withExtraInfo(String extraInfo) {
            this.extraInfo = extraInfo;
            return this;
        }

        public Question build(){
            Question question = new Question();
            question.question = this.question;
            question.correctAnswer = this.correctAnswer;
            question.coordinates = this.coordinates;
            question.answers = this.answer;
            question.extraInformation = this.extraInfo;
            return question;

        }

        public static QuestionBuilder aQuestion(){
            return new QuestionBuilder();
        }
    }
}
