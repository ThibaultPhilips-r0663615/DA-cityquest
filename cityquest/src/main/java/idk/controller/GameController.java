package idk.controller;

import idk.database.GameRepository;
import idk.implementation.GeoDistComparator;
import idk.implementation.RecommendationComparator;
import idk.model.Coordinates;
import idk.model.Game;
import idk.model.GameRecommendations;
import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.cloud.client.discovery.DiscoveryClient;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import javax.naming.ServiceUnavailableException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@RequestMapping("/games")
@RestController
public class GameController {

    //@Autowired private DiscoveryClient discoveryClient;
    @Autowired private GameRepository gameRepository;
    @Autowired private RestTemplate restTemplate;

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

    @RequestMapping(path = "/{id}", method = RequestMethod.GET)
    public Game getGame(@PathVariable("id") UUID id){
        return gameRepository.findById(id).orElseThrow(GameNotFoundException::new);
    }

    @RequestMapping(path = "/{id}", method = RequestMethod.PUT)
    public Game updateGame(@PathVariable("id") UUID id, @RequestBody Game game){
        if(!id.equals(game.getId())) throw new MethodNotAllowedException();
        return gameRepository.save(game);
    }

    @RequestMapping(path = "/nearest", method = RequestMethod.GET)
    public List<Game> getGamesNearest(@RequestParam("longitude") double longitude, @RequestParam("latitude") double latitude){
        return StreamSupport
                .stream(gameRepository.findAll().spliterator(), false)
                .sorted(new GeoDistComparator(new Coordinates(longitude, latitude)))
                .limit(10)
                .peek(game -> game.setQuestions(new ArrayList<>()))
                .collect(Collectors.toList());
    }

    @RequestMapping(path = "/recommendations", method = RequestMethod.GET)
    public List<Game> getGameRecommendations(@RequestParam("email") String emailAddress){
        try {
            GameRecommendations recommendations = getRecommendations(emailAddress);

            return StreamSupport
                    .stream(gameRepository.findAll().spliterator(), false)
                    .sorted(new RecommendationComparator(recommendations))
                    .limit(10)
                    .peek(game -> game.setQuestions(new ArrayList<>()))
                    .collect(Collectors.toList());
        } catch (ServiceUnavailableException e){
            return getGames();
        }
    }

    private GameRecommendations getRecommendations(String emailAddress) throws ServiceUnavailableException {
        URI service = recommendationServiceUrl()
            .map(s -> s.resolve("/recommend/" + emailAddress))
            .orElseThrow(ServiceUnavailableException::new);

        return restTemplate
                .getForEntity(service, GameRecommendations.class)
                .getBody();
    }

    public Optional<URI> recommendationServiceUrl() {
        try {
            return Optional.of(new URI("http://localhost:8081"));
        } catch (URISyntaxException e) {
            throw new RuntimeException(e);
        }
    }

//    public Optional<URI> recommendationServiceUrl() {
//        return discoveryClient.getInstances("recommendation")
//                .stream()
//                .map(si -> si.getUri())
//                .findFirst();
//    }

    @ResponseStatus(code = HttpStatus.NOT_FOUND, reason = "Game not found")
    private class GameNotFoundException extends RuntimeException {
    }

    @ResponseStatus(code = HttpStatus.METHOD_NOT_ALLOWED)
    private class MethodNotAllowedException extends RuntimeException {
    }
}