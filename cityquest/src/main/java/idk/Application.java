package idk;

import idk.database.GameRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import static idk.model.Game.GameBuilder.aGame;
import static idk.model.Question.QuestionBuilder.aQuestion;

@SpringBootApplication
public class Application {

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

    // Why comment: @Bean => word uitgevoerd bij opstarten app. => geen void returne => error want bean mag geen void zijn
    @Bean
    public CommandLineRunner demo(GameRepository repository) {
        return (args) -> {
            repository.save(
                    aGame()
                        .withName("Game name")
                        .withLocation("Leuven")
                        .withDescription("Game description")
                        .withCoordinates(40.364646, 84.747747)
                        .withQuestion(
                                aQuestion()
                                        .withQuestion("Question 1")
                                        .withAnswer("Answer 1")
                                        .withAnswer("Answer 2")
                                        .withAnswer("Answer 3")
                                        .withCoordinates(41.23124, 83.234312)
                                        .withCorrectAnswer(1)
                                        .withExtraInfo("Question extra info")
                        )
                        .build());
        };
    }
}