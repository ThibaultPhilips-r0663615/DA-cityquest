package idk.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.time.LocalTime;
import java.util.UUID;

@Entity
public class GameScore {
    @Id
    @GeneratedValue
    private UUID id;
    private UUID gameId;
    private LocalTime startTime, endTime;
    private float score;

    public GameScore() {
        
    }

    public void setGameId(UUID gameId) {
        this.gameId = gameId;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public void setStartTime(LocalTime startTime) {
        this.startTime = startTime;
    }

    public void setEndTime(LocalTime endTime) {
        this.endTime = endTime;
    }

    public void setScore(float score) {
        this.score = score;
    }

    public UUID getGameId() {
        return gameId;
    }

    public UUID getId() {
        return id;
    }

    public LocalTime getStartTime() {
        return startTime;
    }

    public LocalTime getEndTime() {
        return endTime;
    }

    public float getScore() {
        return score;
    }
    
    public static class GameScoreBuilder {
        private UUID id;
        private UUID gameId;
        private LocalTime startTime, endTime;
        private float score;

        public GameScoreBuilder() {
            
        }

        public GameScoreBuilder withGameId(UUID gameId) {
            this.gameId = gameId;
            return this;
        }

        public GameScoreBuilder withId(UUID id) {
            this.id = id;
            return this;
        }

        public GameScoreBuilder withStartTime(LocalTime startTime) {
            this.startTime = startTime;
            return this;
        }

        public GameScoreBuilder withEndTime(LocalTime endTime) {
            this.endTime = endTime;
            return this;
        }

        public GameScoreBuilder withScore(float score) {
            this.score = score;
            return this;
        }

        public static GameScoreBuilder aGameScore(){
            return new GameScoreBuilder();
        }

        public GameScore build(){
            GameScore gameScore = new GameScore();
            gameScore.id = this.id;
            gameScore.startTime = this.startTime;
            gameScore.endTime = this.endTime;
            gameScore.score = this.score;
            return gameScore;
        }
    }
}
