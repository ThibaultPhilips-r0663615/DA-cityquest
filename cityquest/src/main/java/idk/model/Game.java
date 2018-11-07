package idk.model;

import idk.model.Question.QuestionBuilder;

import java.util.ArrayList;
import java.util.List;

public class Game {
    private String name, location, description;
    private Coordinates coordinates;
    private List<Question> questions = new ArrayList<>();

    public Game(){

    }

    public void setName(String name) {
        this.name = name;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setCoordinates(Coordinates coordinates) {
        this.coordinates = coordinates;
    }

    public void setQuestions(List<Question> questions) {
        this.questions = questions;
    }

    public String getName() {
        return name;
    }

    public String getLocation() {
        return location;
    }

    public String getDescription() {
        return description;
    }

    public Coordinates getCoordinates() {
        return coordinates;
    }

    public List<Question> getQuestions() {
        return questions;
    }

    public static class GameBuilder{
        private String name, location, description;
        private Coordinates coordinates;
        private List<Question> questions = new ArrayList<>();

        private GameBuilder(){

        }

        public GameBuilder withName(String name) {
            this.name = name;
            return this;
        }

        public GameBuilder withLocation(String location) {
            this.location = location;
            return this;
        }

        public GameBuilder withDescription(String description) {
            this.description = description;
            return this;
        }

        public GameBuilder withCoordinates(Coordinates coordinates) {
            this.coordinates = coordinates;
            return this;
        }

        public GameBuilder withCoordinates(double longitude, double altitude) {
            this.coordinates = new Coordinates(longitude, altitude);
            return this;
        }

        public GameBuilder withQuestions(List<Question> questions) {
            this.questions = questions;
            return this;
        }

        public GameBuilder withQuestion(QuestionBuilder questionBuilder) {
            this.questions.add(questionBuilder.build());
            return this;
        }

        public static GameBuilder aGame (){
            return new GameBuilder();
        }

        public Game build(){
            Game game = new Game();
            game.name = name;
            game.location = location;
            game.description = description;
            game.coordinates = coordinates;
            game.questions = questions;
            return game;
        }
    }
}
