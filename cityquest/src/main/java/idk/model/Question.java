package idk.model;

import java.util.ArrayList;
import java.util.List;

public class Question {
    private String question, extraInfo;
    private Coordinates coordinates;
    private int correctAnswer;
    private List<String> answer = new ArrayList<>();

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

    public void setAnswer(List<String> answer) {
        this.answer = answer;
    }

    public void setExtraInfo(String extraInfo) {
        this.extraInfo = extraInfo;
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

    public List<String> getAnswer() {
        return answer;
    }

    public String getExtraInfo() {
        return extraInfo;
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

        public QuestionBuilder withCoordinates(double longtidue, double altitude) {
            this.coordinates = new Coordinates(longtidue, altitude);
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
            question.answer = this.answer;
            question.extraInfo = this.extraInfo;
            return question;

        }

        public static QuestionBuilder aQuestion(){
            return new QuestionBuilder();
        }
    }
}
