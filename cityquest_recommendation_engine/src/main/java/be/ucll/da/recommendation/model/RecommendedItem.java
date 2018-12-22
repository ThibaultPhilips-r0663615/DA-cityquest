package be.ucll.da.recommendation.model;

import javax.persistence.*;
import java.io.Serializable;
import java.util.UUID;

@Entity
@IdClass(RecommendedItem.RecommendedItemKey.class)
public class RecommendedItem {

    @Id
    private UUID ratedItem;
    @Id
    private String emailAddress;

    private float rating;

    public String getEmailAddress() {
        return emailAddress;
    }

    public void setEmailAddress(String emailAddress) {
        this.emailAddress = emailAddress;
    }

    public UUID getRatedItem() {
        return ratedItem;
    }

    public void setRatedItem(UUID ratedItem) {
        this.ratedItem = ratedItem;
    }

    public float getRating() {
        return rating;
    }

    public void setRating(float rating) {
        this.rating = rating;
    }

    public static class RecommendedItemKey implements Serializable {
        private UUID ratedItem;
        private String emailAddress;
    }
}
