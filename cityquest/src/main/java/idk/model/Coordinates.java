package idk.model;

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

    public double dist(Coordinates other){
        double R = 6371;
        double dLat = deg2rad(other.lat - this.lat);
        double dLon = deg2rad(other.lon - this.lon);

        double a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                   Math.cos(deg2rad(this.lat)) * Math.cos(deg2rad(other.lat)) *
                   Math.sin(dLon/2) * Math.sin(dLon/2);

        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        double d = R * c;

        return d;
    }

    private double deg2rad(double deg) {
        return deg * (Math.PI/180);
    }
}
