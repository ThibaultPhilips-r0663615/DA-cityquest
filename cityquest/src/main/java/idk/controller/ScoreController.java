package idk.controller;

import idk.database.ScoreRepository;
import idk.model.Score;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@RestController
@RequestMapping("/scores")
public class ScoreController {

    private ScoreRepository scoreRepository;

    public ScoreController(ScoreRepository scoreRepository){
        this.scoreRepository = scoreRepository;
    }

    @RequestMapping(method = RequestMethod.POST)
    public Score addScore(@RequestBody Score score){
        return scoreRepository.save(score);
    }


    @RequestMapping(path="/{id}/averageDuration", method = RequestMethod.GET)
    public double getAverageDuration(@PathVariable("id") UUID gameId){
        return StreamSupport
                .stream(scoreRepository.findAllByGameId(gameId).spliterator(), false)
                .mapToLong(Score::getDurationInSeconds)
                .average().orElseThrow(ScoreNotPresentException::new);
    }

    @RequestMapping(path="/{id}/averageScore", method = RequestMethod.GET)
    public double getAverageScore(@PathVariable("id") UUID gameId){
        return StreamSupport
                .stream(scoreRepository.findAllByGameId(gameId).spliterator(), false)
                .mapToInt(Score::getScore)
                .average().orElseThrow(ScoreNotPresentException::new);
    }

    @ResponseStatus(code = HttpStatus.NO_CONTENT, reason = "There are no scores yet for this game")
    private class ScoreNotPresentException extends RuntimeException {
    }
}
