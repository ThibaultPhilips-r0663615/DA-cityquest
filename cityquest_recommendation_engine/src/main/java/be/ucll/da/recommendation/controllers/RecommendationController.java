package be.ucll.da.recommendation.controllers;

import be.ucll.da.recommendation.model.Item;
import be.ucll.da.recommendation.model.RecommendedItem;
import be.ucll.da.recommendation.model.SlopeOne;
import be.ucll.da.recommendation.model.User;
import be.ucll.da.recommendation.repository.RecommendedItemRepository;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@RestController
public class RecommendationController {

    private RecommendedItemRepository repository;

    public RecommendationController(RecommendedItemRepository repository) {
        this.repository = repository;
    }

    @RequestMapping(value = "/recommend", method = RequestMethod.POST)
    public RecommendedItem recommendItem(@RequestBody RecommendedItem recommendedItem) {
        return repository.save(recommendedItem);
    }

    @RequestMapping("/recommend/{emailAddress}")
    public Map<Item, Float> getRecommendedItems(@PathVariable String emailAddress) {
        Map<Item, Float> userPreferences = getUserPreferences(emailAddress);
        if(userPreferences.isEmpty()) return new HashMap<>();
        SlopeOne slopeOnePredictionMachine = getSlopeOnePredictionMachine();

        return slopeOnePredictionMachine.predict(userPreferences);
    }

    private Map<Item, Float> getUserPreferences(String emailAddress) {
        return StreamSupport
                .stream(repository.findAllByEmailAddress(emailAddress).spliterator(), false)
                .collect(Collectors.toMap(
                        recommendedItem -> new Item(recommendedItem.getRatedItem()),
                        RecommendedItem::getRating
                        )
                );
    }

    private SlopeOne getSlopeOnePredictionMachine() {
        Map<User, Map<Item, Float>> allSavedPreferences = new HashMap<>();

        StreamSupport
                .stream(repository.findAll().spliterator(), false)
                .forEach(recommendedItem -> addRecommendedItemToAllSavedPreferences(allSavedPreferences, recommendedItem));

        return new SlopeOne(allSavedPreferences);
    }

    private void addRecommendedItemToAllSavedPreferences(Map<User, Map<Item, Float>> allSavedPreferences, RecommendedItem recommendedItem) {
        User user = new User(recommendedItem.getEmailAddress());
        allSavedPreferences.putIfAbsent(user, new HashMap<>());

        Map<Item, Float> userPreferences = allSavedPreferences.get(user);
        userPreferences.put(new Item(recommendedItem.getRatedItem()), recommendedItem.getRating());
    }
}
