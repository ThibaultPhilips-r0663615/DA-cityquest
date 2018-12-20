package be.ucll.da.recommendation.model;

import org.junit.Test;

import java.util.HashMap;
import java.util.Map;

public class SlopeOneTest {

    @Test
    public void doesSlopeOneDoWhatIExpectItToDo() {
        HashMap<User, Map<Item, Float>> userPreferences = createUserPreferencesMap();
        SlopeOne slopeOne = new SlopeOne(userPreferences);

        HashMap<Item, Float> kakophonixPreferences = new HashMap<>();
        kakophonixPreferences.put(new Item("Toverdrank"), 4.5f);

        Map<Item, Float> predict = slopeOne.predict(kakophonixPreferences);
        assert(predict.get(new Item("Everzwijnen")) > predict.get(new Item("Romeinen")));
    }

    private HashMap<User, Map<Item, Float>> createUserPreferencesMap() {
        HashMap<User, Map<Item, Float>> userMap = new HashMap<>();

        HashMap<Item, Float> asterixPreferences = new HashMap<>();
        asterixPreferences.put(new Item("Toverdrank"), 4.8f);
        asterixPreferences.put(new Item("Romeinen"), 1.2f);
        asterixPreferences.put(new Item("Everzwijnen"), 4.6f);
        userMap.put(new User("Asterix"), asterixPreferences);

        HashMap<Item, Float> obelixPreferences = new HashMap<>();
        obelixPreferences.put(new Item("Toverdrank"), 4.4f);
        obelixPreferences.put(new Item("Romeinen"), 3.2f);
        obelixPreferences.put(new Item("Everzwijnen"), 5f);
        userMap.put(new User("Obelix"), obelixPreferences);

        HashMap<Item, Float> panoramixPreferences = new HashMap<>();
        panoramixPreferences.put(new Item("Toverdrank"), 4.2f);
        panoramixPreferences.put(new Item("Romeinen"), 2.2f);
        panoramixPreferences.put(new Item("Everzwijnen"), 4.1f);
        userMap.put(new User("Panoramix"), panoramixPreferences);

        return userMap;
    }
}
