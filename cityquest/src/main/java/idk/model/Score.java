package idk.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.time.LocalDateTime;
import java.time.LocalDateTime;
import java.time.temporal.TemporalUnit;
import java.util.UUID;

import static java.time.temporal.ChronoUnit.SECONDS;

@Entity
public class Score {

    @Id
    @GeneratedValue
    private UUID id;
    private UUID gameId;
    private LocalDateTime startTime, endTime;
    private int score;

    public Score() {
    }
    
    public long getDurationInSeconds(){
        return startTime.until(endTime, SECONDS);
    }

    public void setGameId(UUID gameId) {
        this.gameId = gameId;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public void setStartTime(LocalDateTime startTime) {
        this.startTime = startTime;
    }

    public void setEndTime(LocalDateTime endTime) {
        this.endTime = endTime;
    }

    public void setScore(int score) {
        this.score = score;
    }

    public UUID getGameId() {
        return gameId;
    }

    public UUID getId() {
        return id;
    }

    public LocalDateTime getStartTime() {
        return startTime;
    }

    public LocalDateTime getEndTime() {
        return endTime;
    }

    public int getScore() {
        return score;
    }
    
    public static class GameScoreBuilder {
        private UUID gameId;
        private LocalDateTime startTime, endTime;
        private int score;

        public GameScoreBuilder() {
            
        }

        public GameScoreBuilder withGameId(UUID gameId) {
            this.gameId = gameId;
            return this;
        }

        public GameScoreBuilder withStartTime(LocalDateTime startTime) {
            this.startTime = startTime;
            return this;
        }

        public GameScoreBuilder withEndTime(LocalDateTime endTime) {
            this.endTime = endTime;
            return this;
        }

        public GameScoreBuilder withScore(int score) {
            this.score = score;
            return this;
        }

        public static GameScoreBuilder aGameScore(){
            return new GameScoreBuilder();
        }

        public Score build(){
            Score score = new Score();
            score.startTime = this.startTime;
            score.endTime = this.endTime;
            score.score = this.score;
            return score;
        }
    }
}
