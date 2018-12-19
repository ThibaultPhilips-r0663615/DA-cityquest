package idk;

import idk.database.GameRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import static idk.model.Game.GameBuilder.aGame;
import static idk.model.Question.QuestionBuilder.aQuestion;

@SpringBootApplication
public class Application {

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

    @Configuration
    public class WebConfig implements WebMvcConfigurer {
        @Override
        public void addCorsMappings(CorsRegistry registry) {
            registry.addMapping("/**")
                    .allowedOrigins("*", "**")
                    .allowedMethods("PUT", "DELETE", "GET", "POST");
        }
    }

    @Bean
    public CommandLineRunner demo(GameRepository repository) {
        return (args) -> {
            repository.save(
                    aGame()
                            .withName("Game name")
                            .withLocation("Leuven")
                            .withDescription("Game description")
                            .withCoordinates(84.747747, 40.364646)
                            .withQuestion(
                                    aQuestion()
                                            .withQuestion("Question 1")
                                            .withAnswer("Answer 1")
                                            .withAnswer("Answer 2")
                                            .withAnswer("Answer 3")
                                            .withCoordinates(41.23124, 83.234312)
                                            .withCorrectAnswer(1)
                                            .withExtraInformation("Question extra info")
                            )
                            .build());
            repository.save(
                    aGame()
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
                                            .withExtraInformation("Question extra info")
                            )
                            .build());
            repository.save(
                    aGame()
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
                            )
                            .build());
        };
    }
}