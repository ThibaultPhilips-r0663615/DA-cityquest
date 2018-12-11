package idk.database;

import idk.model.Score;
import org.springframework.data.repository.CrudRepository;

import java.util.UUID;

public interface ScoreRepository extends CrudRepository<Score, UUID> {
	Iterable<Score> findAllByGameId(UUID gameId);
}
