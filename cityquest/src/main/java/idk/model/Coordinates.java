package idk.model;

public class Coordinates {
    private double longitude, altitude;

    public Coordinates(double longitude, double altitude){
        this.longitude = longitude;
        this.altitude = altitude;
    }

    public double getLongitude() {
        return longitude;
    }

    public double getAltitude() {
        return altitude;
    }
}
