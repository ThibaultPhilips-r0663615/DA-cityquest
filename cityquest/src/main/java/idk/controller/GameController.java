package idk.controller;

import idk.database.GameRepository;
import idk.implementation.GeoDistComparator;
import idk.model.Coordinates;
import idk.model.Game;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@RequestMapping("/games")
@RestController
public class GameController {

    private GameRepository gameRepository;

    // Geen autowired required => gebeurt automatisch wanneer je parameter meegeeft aan constructor
    // Bean wordt aangemaakt door interface die CrudRepository implementeert.
    public GameController(GameRepository gameRepository) {
        this.gameRepository = gameRepository;
    }

    @RequestMapping(method = RequestMethod.GET)
    public List<Game> getGames() {
        return StreamSupport
                .stream(gameRepository.findAll().spliterator(), false)
                .peek(game -> game.setQuestions(new ArrayList<>()))
                .collect(Collectors.toList());
    }

    @RequestMapping(method = RequestMethod.POST)
    public Game addGame(@RequestBody Game game){
        return gameRepository.save(game);
    }

    @RequestMapping(path = "/near", method = RequestMethod.GET)
    public List<Game> getGamesOrdered(@RequestParam("lon") double lon, @RequestParam("lat") double lat){
        return StreamSupport
                .stream(gameRepository.findAll().spliterator(), false)
                .peek(game -> game.setQuestions(new ArrayList<>()))
                .sorted(new GeoDistComparator(new Coordinates(lon, lat)))
                .collect(Collectors.toList());
    }

    @RequestMapping(path = "/{id}", method = RequestMethod.GET)
    public Game getGame(@PathVariable("id") UUID id){
        return gameRepository.findById(id).orElseThrow(GameNotFoundException::new);
    }

    @RequestMapping(path = "/{id}", method = RequestMethod.PUT)
    public Game updateGame(@PathVariable("id") UUID id, @RequestBody Game game){
        if(!id.equals(game.getId())) throw new MethodNotAllowedException();
        return gameRepository.save(game);
    }

    @ResponseStatus(code = HttpStatus.NOT_FOUND, reason = "game not found")
    private class GameNotFoundException extends RuntimeException {
    }

    @ResponseStatus(code = HttpStatus.METHOD_NOT_ALLOWED)
    private class MethodNotAllowedException extends RuntimeException {
    }

}