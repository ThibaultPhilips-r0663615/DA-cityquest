package idk.controller;

import idk.database.GameRepository;
import idk.model.Game;
import idk.model.GameRecommendations;
import org.junit.Before;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

import java.net.URI;
import java.util.UUID;

import static idk.model.Game.GameBuilder.*;
import static net.javacrumbs.jsonunit.fluent.JsonFluentAssert.assertThatJson;
import static org.mockito.Mockito.when;

public class GameControllerIT extends AbstractControllerIT {

	@Autowired private GameRepository gameRepository;
	@MockBean private RestTemplate restTemplate;

	@Before
	public void setup(){
		gameRepository.deleteAll();
	}

	@Test
	public void testRetrieveGames_NoSavedGames_EmptyList() {
		String actualGames = httpGet("/games").getBody();
		String expectedGames = "[]";

		assertThatJson(actualGames).isEqualTo(expectedGames);
	}

	@Test
	public void testPostGame() {
		Game game = aDefaultGameA().build();

		String actualGameAsJson = httpPost("/games", game).getBody();
		String expectedGameAsJson = jsonTestFile("defaultGameA.json");

		assertThatJson(actualGameAsJson).isEqualTo(expectedGameAsJson);
	}

	@Test
	public void testPutGame() {
		Game game = aDefaultGameA().build();

		gameRepository.save(game);

		game.setName("Updated game name");
		String actualUpdatedGameAsJson = httpPut("/games/" + game.getId(), game).getBody();

		String expectedUpdatedGameAsJson = jsonTestFile("defaultGameAUpdatedName.json");
		assertThatJson(actualUpdatedGameAsJson).isEqualTo(expectedUpdatedGameAsJson);
	}

	@Test
	public void testGetGames_WithSavedGame_ListWithSavedGames() {
		gameRepository.save(aDefaultGameA().build());
		gameRepository.save(aDefaultGameB().build());
		gameRepository.save(aDefaultGameC().build());

		String actualGames = httpGet("/games").getBody();
		String expectedGames = jsonTestFile("defaultGameList.json");

		assertThatJson(actualGames).isEqualTo(expectedGames);
	}

	@Test
	public void testGetNearestGames_WithSavedGames_GivesOrderedList(){
		gameRepository.save(aDefaultGameA().build());
		gameRepository.save(aDefaultGameB().build());
		gameRepository.save(aDefaultGameC().build());

		String actualOrderedGames = httpGet("/games/nearest?longitude=4.534750000000031&latitude=50.77381").getBody();
		String expectedOrderedGames = jsonTestFile("nearestGameList.json");

		assertThatJson(actualOrderedGames).isEqualTo(expectedOrderedGames);
	}

	@Test
	public void testGetRecommendations_withSavedGames_givesOrderedList(){
		UUID gameIdA = gameRepository.save(aDefaultGameA().build()).getId();
		UUID gameIdB = gameRepository.save(aDefaultGameB().build()).getId();
		UUID gameIdC = gameRepository.save(aDefaultGameC().build()).getId();

		GameRecommendations recommendations = new GameRecommendations();
		recommendations.put(gameIdA, 5.0f);
		recommendations.put(gameIdB, 2.5f);
		recommendations.put(gameIdC, 7.5f);

		when(restTemplate.getForEntity(URI.create("http://localhost:8081/recommendation/recommend/a@a.com"), GameRecommendations.class))
			.thenReturn(new ResponseEntity<>(recommendations, HttpStatus.OK));

		String actualRecommendations = httpGet("/games/recommendations?email=a@a.com").getBody();
		String expectedRecommendations = jsonTestFile("recommendationList.json");

		assertThatJson(actualRecommendations).isEqualTo(expectedRecommendations);
	}

}