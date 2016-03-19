package bookBook.neo4j;

import io.vertx.core.json.JsonArray;
import io.vertx.core.json.JsonObject;
import org.neo4j.cypherdsl.expression.StartExpression;

import java.util.ArrayList;

/**
 * Created by DMitin on 19.03.2016.
 */
public class CypherFactory {
    public static String createQuery(String name, JsonArray authors, JsonArray tags) {

        ArrayList<StartExpression> startExpressions = new ArrayList<>();
        JsonObject props = new JsonObject();
        /*authors.forEach(author-> {
            JsonObject authorJson = (JsonObject)author;
            System.out.println(isId(authorJson));
            if (isId(authorJson)) {

            }
        });
        */


        return "";
    }

    private static boolean isId(JsonObject obj) {
        return obj.getString("id") == null;
    }
}
