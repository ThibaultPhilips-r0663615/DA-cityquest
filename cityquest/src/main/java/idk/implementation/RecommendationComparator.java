package idk.implementation;

import idk.model.Game;
import idk.model.GameRecommendations;

import java.util.Comparator;

public class RecommendationComparator implements Comparator<Game> {

	private GameRecommendations recommendations;

	public RecommendationComparator(GameRecommendations recommendations) {
		this.recommendations = recommendations;
	}

	@Override
	public int compare(Game o1, Game o2) {
		return Float.compare(
				recommendations.getRatingForGame(o2),
				recommendations.getRatingForGame(o1)
		);
	}
}
