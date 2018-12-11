package idk.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.time.LocalDateTime;
import java.util.UUID;

import static java.time.temporal.ChronoUnit.SECONDS;

@Entity
public class Score {

    @Id
    @GeneratedValue
    private UUID id;
    private UUID gameId;
    private LocalDateTime startTime, endTime;
    private int answersCorrect;

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

    public void setAnswersCorrect(int answersCorrect) {
        this.answersCorrect = answersCorrect;
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

    public int getAnswersCorrect() {
        return answersCorrect;
    }
    
    public static class GameScoreBuilder {
        private UUID gameId;
        private LocalDateTime startTime, endTime;
        private int answersCorrect;

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

        public GameScoreBuilder withAnswersCorrect(int answersCorrect) {
            this.answersCorrect = answersCorrect;
            return this;
        }

        public static GameScoreBuilder aGameScore(){
            return new GameScoreBuilder();
        }

        public Score build(){
            Score score = new Score();
            score.startTime = this.startTime;
            score.endTime = this.endTime;
            score.answersCorrect = this.answersCorrect;
            return score;
        }
    }
}
