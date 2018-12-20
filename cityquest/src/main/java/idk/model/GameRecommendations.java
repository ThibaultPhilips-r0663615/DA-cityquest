package idk.model;

import java.util.HashMap;
import java.util.UUID;

public class GameRecommendations extends HashMap<UUID, Float> {

	public Float getRatingForGame(Game game){
		return super.getOrDefault(game.getId(), 0.0f);
	}

}
