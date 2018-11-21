package idk.model;

import org.assertj.core.api.Assertions;
import org.junit.Test;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.within;

public class CoordinatesTest {

	@Test
	public void coordinate_calculateDistanceBetween2SamePoints(){
		Coordinates coordinates = new Coordinates(2.5, 2.6);

		double distance = coordinates.distInKilometer(coordinates);

		assertThat(distance).isCloseTo(0.0, within(0.001));
	}

	@Test
	public void coordinate_calculateDistanceBetween2ClosePoints(){
		Coordinates coordinates1 = new Coordinates(45.0, 10.5);
		Coordinates coordinates2 = new Coordinates(45.5, 10.0);

		double distance = coordinates1.distInKilometer(coordinates2);

		assertThat(distance).isCloseTo(78.002, within(0.001));
	}

	@Test
	public void coordinates_calculateDistanceBetween2DistantPoints(){
		Coordinates coordinates1 = new Coordinates(-45.0, 10.5);
		Coordinates coordinates2 = new Coordinates(45.5, -10.0);

		double distance = coordinates1.distInKilometer(coordinates2);

		assertThat(distance).isCloseTo(10263.057, within(0.001));
	}

}
