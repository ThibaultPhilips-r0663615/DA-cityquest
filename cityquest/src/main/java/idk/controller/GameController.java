package idk.controller;

import idk.model.Game;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;

import static idk.model.Game.GameBuilder.aGame;
import static idk.model.Question.QuestionBuilder.aQuestion;

@RestController
public class GameController {
    @RequestMapping("/getGames")
    public List<Game> getGames() {
        Game game = aGame()
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
        .build();

        return Arrays.asList(game);
    }
}