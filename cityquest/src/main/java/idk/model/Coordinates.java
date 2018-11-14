package idk.model;

public class Coordinates {
    private double longitude, latitude;

    public Coordinates() {
        // Why comment : CoordinatesConverter uses default constructor
    }

    public Coordinates(double longitude, double latitude){
        this.longitude = longitude;
        this.latitude = latitude;
    }

    public double getLongitude() {
        return longitude;
    }

    public double getLatitude() {
        return latitude;
    }
}
