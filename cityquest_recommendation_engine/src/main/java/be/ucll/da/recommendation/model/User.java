package be.ucll.da.recommendation.model;

public class User {
    private String content;

    public User(String s) {
        content = s;
    }

    public int hashCode() { return content.hashCode();}
    public String toString() { return content; }

    @Override
    public boolean equals(Object obj) {
        return obj instanceof User && this.content.equals(((User) obj).content);
    }
}