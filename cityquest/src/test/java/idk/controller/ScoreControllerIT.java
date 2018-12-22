package idk.controller;

import idk.database.ScoreRepository;
import idk.model.Score;
import org.json.JSONException;
import org.json.JSONObject;
import org.json.JSONTokener;
import org.junit.Before;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.time.LocalDateTime;
import java.util.UUID;

import static idk.model.Score.ScoreBuilder.aDefaultScore;
import static net.javacrumbs.jsonunit.fluent.JsonFluentAssert.assertThatJson;
import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.within;

public class ScoreControllerIT extends AbstractControllerIT {

	@Autowired private ScoreRepository scoreRepository;

	@Before
	public void setup(){
		scoreRepository.deleteAll();
	}

	@Test
	public void testPostScore() {
		Score score = aDefaultScore().build();

		String actualScoreAsJson = httpPost("/scores", score).getBody();
		String expectedScoreAsJson = jsonTestFile("defaultScore.json");

		assertThatJson(actualScoreAsJson).isEqualTo(expectedScoreAsJson);
	}

	@Test
	public void testRetrieveScores_NoSavedScores_GivesError() {
		ResponseEntity<String> response = httpGet("/scores/" + UUID.randomUUID());

		assertThat(response.getStatusCode()).isEqualTo(HttpStatus.NO_CONTENT);
	}

	@Test
	public void testRetrieveScores_2SavedScores_GivesAverage() throws JSONException {
		Score score = aDefaultScore().build();
		Score score2 = aDefaultScore()
				.withAnswersCorrect(10)
				.withEndTime(LocalDateTime.parse("2018-12-24T23:24:36.456"))
				.build();

		scoreRepository.save(score);
		scoreRepository.save(score2);

		String actualAverageAsJson = httpGet("/scores/" + score.getGameId()).getBody();

		JSONObject jsonData = new JSONObject(new JSONTokener(actualAverageAsJson));
		double actualAverageDuration = Double.parseDouble(jsonData.get("averageDurationInSeconds").toString());
		double actualAverageCorrect = Double.parseDouble(jsonData.get("averageAnswersCorrect").toString());

		double expectedAverageDuration = 38363.0;
		double expectedAverageCorrect = 7.5;

		assertThat(actualAverageDuration).isCloseTo(expectedAverageDuration, within(0.001));
		assertThat(actualAverageCorrect).isCloseTo(expectedAverageCorrect, within(0.001));
	}

}