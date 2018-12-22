package be.ucll.da.recommendation.controller;

import be.ucll.da.recommendation.model.RecommendedItem;
import be.ucll.da.recommendation.repository.RecommendedItemRepository;
import org.json.JSONException;
import org.json.JSONObject;
import org.json.JSONTokener;
import org.junit.Before;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.UUID;
import static org.assertj.core.api.Assertions.assertThat;

import static net.javacrumbs.jsonunit.fluent.JsonFluentAssert.assertThatJson;

public class RecommendationControllerIT extends AbstractControllerIT {

	@Autowired private RecommendedItemRepository itemRepository;

	@Before
	public void setup(){
		itemRepository.deleteAll();
	}

	@Test
	public void getRecommendedItems_givesCorrectMap() throws JSONException {
		UUID id1 = UUID.fromString("d79808a4-e3cd-48c1-9a66-2b7dc705bec9");
		UUID id2 = UUID.fromString("0c5ccc74-c3db-4e16-b2d3-c88ce6c80da1");

		RecommendedItem item1 = new RecommendedItem();
		item1.setEmailAddress("a@a.com");
		item1.setRatedItem(id1);
		item1.setRating(5.0f);

		RecommendedItem item2 = new RecommendedItem();
		item2.setEmailAddress("a@a.com");
		item2.setRatedItem(id2);
		item2.setRating(1.0f);

		RecommendedItem item3 = new RecommendedItem();
		item3.setEmailAddress("b@b.com");
		item3.setRatedItem(id2);
		item3.setRating(1.0f);

		itemRepository.save(item1);
		itemRepository.save(item2);
		itemRepository.save(item3);

		String recommendations = httpGet("/recommend/b@b.com").getBody();
		JSONObject jsonData = new JSONObject(new JSONTokener(recommendations));

		double predictionItem1 = Double.parseDouble(jsonData.get(id1.toString()).toString());
		double predictionItem2 = Double.parseDouble(jsonData.get(id2.toString()).toString());

		assertThat(predictionItem1).isGreaterThan(predictionItem2);
	}

	@Test
	public void testPostItem(){
		RecommendedItem item = new RecommendedItem();
		item.setEmailAddress("a@a.com");
		item.setRatedItem(UUID.fromString("d79808a4-e3cd-48c1-9a66-2b7dc705bec9"));
		item.setRating(1.0f);

		String actualItemAsJson = httpPost("/recommend", item).getBody();
		String expectedItemAsJson = jsonTestFile("defaultItem.json");

		assertThatJson(actualItemAsJson).isEqualTo(expectedItemAsJson);
	}

}
