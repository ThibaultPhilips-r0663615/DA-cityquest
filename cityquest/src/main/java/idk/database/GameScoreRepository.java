package idk.database;

import idk.model.GameScore;
import org.springframework.data.repository.CrudRepository;

import java.util.UUID;

public interface GameScoreRepository extends CrudRepository<GameScore, UUID> {
}
