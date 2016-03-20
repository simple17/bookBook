package bookBook.neo4j;

import io.vertx.core.json.JsonArray;
import io.vertx.core.json.JsonObject;
import org.neo4j.cypherdsl.Path;
import org.neo4j.cypherdsl.expression.StartExpression;
import org.neo4j.cypherdsl.grammar.StartNext;

import java.util.ArrayList;

import static org.neo4j.cypherdsl.CypherQuery.node;
import static org.neo4j.cypherdsl.CypherQuery.nodesById;
import static org.neo4j.cypherdsl.CypherQuery.start;
import static org.neo4j.cypherdsl.CypherQuery.*;
import static org.neo4j.cypherdsl.Order.ASCENDING;
import static org.neo4j.cypherdsl.Order.DESCENDING;

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



    public static String createQuery(String name, JsonArray tags) {

        String tagLetter = "t";
        ArrayList<String> params = new ArrayList<>();
        ArrayList<StartExpression> startExpressions = new ArrayList<>();
        for(int i =0; i < tags.size(); i ++) {
            JsonObject tag = tags.getJsonObject(i);
            Long id = tag.getLong("id");
            String param = tagLetter + i;
            params.add(param);
            startExpressions.add(nodesById(param, id));
        }

        StartNext startQuery = start(startExpressions.toArray(new StartExpression[startExpressions.size()]));

        String bookLetter = "b";
        ArrayList<Path> paths = new ArrayList<>();
        for(int i =0; i < tags.size(); i ++) {
            paths.add(node("b").out("HAS_TAG").node(params.get(i)));
        }

        startQuery.match(paths.toArray(new Path[paths.size()]));
        if(paths.isEmpty()) {
            startQuery.match(node(bookLetter).label("Book"));
        }
        //startQuery.orderBy( order( identifier( "event" ).property( "name" ), ASCENDING )
        startQuery
                .returns(identifier(bookLetter))
                .orderBy(order(identifier( "b" ).property( "rating" ), DESCENDING ));

        String request = startQuery.toString();
        String returnString = request;
        if (name != null && !name.isEmpty()){
            String whereClause = "WHERE b.title CONTAINS \'" + name + "\' ";
            int position = request.indexOf("RETURN");
            String queryWhere = new StringBuffer(request).insert(position, whereClause).toString();
            returnString = queryWhere;

        }
        System.out.println(returnString);

        return returnString;
    }
}
