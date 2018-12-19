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
	public void testPostGame() throws JSONException {
		Game game = aDefaultGame().build();

		String actualGameAsJson = httpPost("/games", game);
		String expectedGameAsJson = jsonTestFile("testGame.json");

		assertThatJson(actualGameAsJson).isEqualTo(expectedGameAsJson);
	}

	@Test
	public void testPutGame() throws JSONException, IOException {
		Game game = aDefaultGame().build();

		String actualGameAsJson = httpPost("/games", game);
		Game savedGame = new ObjectMapper().readValue(actualGameAsJson, Game.class);

		savedGame.setName("Updated game name");
		String updatedGameAsJson = httpPut("/games/" + savedGame.getId(), savedGame);

		String expectedGameAsJson = jsonTestFile("testGameUpdatedName.json");
		assertThatJson(updatedGameAsJson).isEqualTo(expectedGameAsJson);
	}

	@Test
	public void testGetGames_WithSavedGame_ListWithSavedGame() throws JSONException {
		Game game = aDefaultGame().build();

		httpPost("/games", game);

		String actualGames = httpGet("/games");
		String expectedGames = jsonTestFile("testGameList.json");

		assertThatJson(actualGames).isEqualTo(expectedGames);
	}
}