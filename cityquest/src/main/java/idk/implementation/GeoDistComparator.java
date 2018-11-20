package idk.implementation;

import idk.model.Coordinates;
import idk.model.Game;

import java.util.Comparator;

public class GeoDistComparator implements Comparator<Game> {

	private Coordinates coordinates;

	public GeoDistComparator(Coordinates coordinates) {
		this.coordinates = coordinates;
	}

	@Override
	public int compare(Game o1, Game o2) {
		double dist1 = o1.getCoordinates().dist(coordinates);
		double dist2 = o2.getCoordinates().dist(coordinates);

		return dist1 < dist2 ? -1 :
				dist1 > dist2 ? 1 : 0;
	}
}
