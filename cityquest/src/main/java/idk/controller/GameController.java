package idk.controller;

import idk.database.GameRepository;
import idk.model.Game;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static idk.model.Game.GameBuilder.aGame;
import static idk.model.Question.QuestionBuilder.aQuestion;

@RestController
public class GameController {

    private GameRepository gameRepository;

    // Geen autowired recuired => gebeurt automatisch wanneer je parameeter meegeeft aan constructor
    // Bean wordt aangemaakt door interface die CrudRepository implementeert.
    public GameController(GameRepository gameRepository) {
        this.gameRepository = gameRepository;
    }

    @RequestMapping("/getGames")
    public List<Game> getGames() {
        return StreamSupport
                .stream(gameRepository.findAll().spliterator(), false)
                .map(game -> {game.setQuestions(new ArrayList<>()); return game;})
                .collect(Collectors.toList());
    }
}