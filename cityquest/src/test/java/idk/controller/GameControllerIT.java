package idk.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import idk.database.GameRepository;
import idk.model.Game;
import org.json.JSONException;
import org.junit.Before;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.io.IOException;

import static idk.model.Game.GameBuilder.aDefaultGame;
import static net.javacrumbs.jsonunit.fluent.JsonFluentAssert.assertThatJson;

public class GameControllerIT extends AbstractControllerIT {

	@Autowired private GameRepository gameRepository;

	@Before
	public void setup(){
		gameRepository.deleteAll();
	}

	@Test
	public void testRetrieveGames_NoSavedGames_EmptyList() {
		String actualGames = httpGet("/games");
		String expectedGames = "[]";

		assertThatJson(actualGames).isEqualTo(expectedGames);
	}

	@Test
	public void testPostGame() {
		Game game = aDefaultGame().build();

		String actualGameAsJson = httpPost("/games", game);
		String expectedGameAsJson = jsonTestFile("testGame.json");

		assertThatJson(actualGameAsJson).isEqualTo(expectedGameAsJson);
	}

	@Test
	public void testPutGame() throws IOException {
		Game game = aDefaultGame().build();

		String actualGameAsJson = httpPost("/games", game);
		Game savedGame = new ObjectMapper().readValue(actualGameAsJson, Game.class);

		savedGame.setName("Updated game name");
		String actualUpdatedGameAsJson = httpPut("/games/" + savedGame.getId(), savedGame);

		String expectedUpdatedGameAsJson = jsonTestFile("testGameUpdatedName.json");
		assertThatJson(actualUpdatedGameAsJson).isEqualTo(expectedUpdatedGameAsJson);
	}

	@Test
	public void testGetGames_WithSavedGame_ListWithSavedGame() {
		Game game = aDefaultGame().build();

		gameRepository.save(game);

		String actualGames = httpGet("/games");
		String expectedGames = jsonTestFile("testGameList.json");

		assertThatJson(actualGames).isEqualTo(expectedGames);
	}
}