package idk.model;

import static java.lang.Math.cos;
import static java.lang.Math.sin;
import static java.lang.Math.toRadians;

public class Coordinates {
    private double lon, lat;

    public Coordinates() {
        // Why comment : CoordinatesConverter uses default constructor
    }

    public Coordinates(double longitude, double latitude){
        this.lon = longitude;
        this.lat = latitude;
    }

    public double getLon() {
        return lon;
    }

    public double getLat() {
        return lat;
    }

    public double distInKilometer(Coordinates other){
        double R = 6371;
        double dLat = toRadians(other.lat - this.lat);
        double dLon = toRadians(other.lon - this.lon);

        double a = sin(dLat/2) * sin(dLat/2) +
                   cos(toRadians(this.lat)) * cos(toRadians(other.lat)) *
                   sin(dLon/2) * sin(dLon/2);

        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

        return R * c;
    }

}
