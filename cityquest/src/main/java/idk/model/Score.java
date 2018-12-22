package idk.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;

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
    @JsonSerialize(using = ToStringSerializer.class)
    private LocalDateTime startTime, endTime;
    private int answersCorrect;

    public Score() {
    }

    @JsonIgnore
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
    
    public static class ScoreBuilder {
        private UUID gameId;
        private LocalDateTime startTime, endTime;
        private int answersCorrect;

        public ScoreBuilder() {
            
        }

        public ScoreBuilder withGameId(UUID gameId) {
            this.gameId = gameId;
            return this;
        }

        public ScoreBuilder withStartTime(LocalDateTime startTime) {
            this.startTime = startTime;
            return this;
        }

        public ScoreBuilder withEndTime(LocalDateTime endTime) {
            this.endTime = endTime;
            return this;
        }

        public ScoreBuilder withAnswersCorrect(int answersCorrect) {
            this.answersCorrect = answersCorrect;
            return this;
        }

        public static ScoreBuilder aScore(){
            return new ScoreBuilder();
        }

        public static ScoreBuilder aDefaultScore(){
            return aScore()
                    .withAnswersCorrect(5)
                    .withGameId(UUID.fromString("11364853-e39c-43ff-ab16-1e0abea4c0ae"))
                    .withStartTime(LocalDateTime.parse("2018-12-24T10:15:13.123"))
                    .withEndTime(LocalDateTime.parse("2018-12-24T18:24:36.456"));
        }

        public Score build(){
            Score score = new Score();
            score.answersCorrect = this.answersCorrect;
            score.gameId = this.gameId;
            score.startTime = this.startTime;
            score.endTime = this.endTime;
            return score;
        }
    }
}
