package idk.model;

import idk.implementation.CoordinatesConverter;
import idk.implementation.QuestionsConverter;
import idk.model.Question.QuestionBuilder;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import static idk.model.Question.QuestionBuilder.aQuestion;

@Entity
public class Game {

    @Id
    @GeneratedValue
    private UUID id;
    private String name, location, description;
    @Convert(converter = CoordinatesConverter.class)
    private Coordinates coordinates;
    @Lob
    @Convert(converter = QuestionsConverter.class)
    private List<Question> questions = new ArrayList<>();

    public Game(){

    }

    public void setId(UUID id) {
        this.id = id;
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

    public UUID getId() {
        return id;
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

        public GameBuilder withCoordinates(double longitude, double latitude) {
            this.coordinates = new Coordinates(longitude, latitude);
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

        public static GameBuilder aDefaultGameA() {
            return aGame().withName("Leuven Treasure Hunt")
                    .withLocation("Leuven")
                    .withCoordinates(4.7005, 50.8798)
                    .withDescription("Follow the map of questions and find the treasure!")
                    .withQuestion(aQuestion()
                            .withCoordinates(4.704496, 50.879154)
                            .withQuestion("What is the main topic in the M-Museum")
                            .withAnswer("National History")
                            .withAnswer("Fashion")
                            .withAnswer("Modern art")
                            .withCorrectAnswer(3)
                            .withExtraInformation("Art museum opened in 2009, architect-designed to unite old buildings with contemporary architecture."))
                    .withQuestion(aQuestion()
                            .withCoordinates(4.701235, 50.879127)
                            .withQuestion("How many statues are on the walls?")
                            .withAnswer("196")
                            .withAnswer("236")
                            .withAnswer("266")
                            .withCorrectAnswer(2)
                            .withExtraInformation("15th-century, Gothic-style, former municipal headquarters with spires & 236 sculptures on the walls."));
        }

        public static GameBuilder aDefaultGameB(){
            return aGame()
                    .withName("Overijse today")
                    .withLocation("Overijse")
                    .withDescription("A walk in the historic village of Overijse!")
                    .withCoordinates(4.534750000000031,50.77381)
                    .withQuestion(
                            aQuestion()
                                    .withQuestion("Why did the town hall change location?")
                                    .withAnswer("Too expensive to maintain the building.")
                                    .withAnswer("Too small for all the employees.")
                                    .withCoordinates(4.53766148622,50.773242668)
                                    .withCorrectAnswer(1)
                                    .withExtraInformation("Question extra info"));
        }

        public static GameBuilder aDefaultGameC(){
            return aGame()
                    .withName("Explore Leuven")
                    .withLocation("Leuven")
                    .withDescription("Visit historic places around Leuven such as the vaartkom, city town hall, ...!")
                    .withCoordinates(4.7005167, 50.8798438)
                    .withQuestion(
                            aQuestion()
                                    .withQuestion("How old is the vaartkom?")
                                    .withAnswer("200 years")
                                    .withAnswer("40 years")
                                    .withAnswer("300 years")
                                    .withCoordinates(4.7031076,50.8876555)
                                    .withCorrectAnswer(3)
                                    .withExtraInformation("Question extra info")
                    )
                    .withQuestion(
                            aQuestion()
                                    .withQuestion("Why did the 'Foche plein' change name?")
                                    .withAnswer("World war II reason.")
                                    .withAnswer("Ugly name")
                                    .withCoordinates(4.70258300,50.8791616)
                                    .withCorrectAnswer(1)
                                    .withExtraInformation("Question extra info")
                    );
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
