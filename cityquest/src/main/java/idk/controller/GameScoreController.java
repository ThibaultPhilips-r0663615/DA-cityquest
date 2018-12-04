package idk.controller;

import com.sun.javafx.sg.prism.MediaFrameTracker;
import idk.database.GameScoreRepository;
import idk.model.GameScore;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@RestController
@RequestMapping("/gamescores")
public class GameScoreController {

    private GameScoreRepository gameScoreRepository;

    public GameScoreController(GameScoreRepository gameScoreRepository){
        this.gameScoreRepository = gameScoreRepository;
    }

    @RequestMapping(method = RequestMethod.GET)
    public List<GameScore> getGameScores(){
        return StreamSupport.stream(gameScoreRepository.findAll().spliterator(), false)
                .collect(Collectors.toList());
    }

    @RequestMapping(method = RequestMethod.POST)
    public GameScore addGameScore(@RequestBody GameScore gameScore){
        return gameScoreRepository.save(gameScore);
    }

    @RequestMapping(path = "/{id}", method = RequestMethod.GET)
    public GameScore getGameScore(@RequestParam("id") UUID id){
        return gameScoreRepository.findById(id).orElseThrow(GameScoreNotFoundException::new);
    }

    @ResponseStatus(code = HttpStatus.NOT_FOUND, reason = "No game score found with the given id.")
    private class GameScoreNotFoundException extends RuntimeException {

    }
}
