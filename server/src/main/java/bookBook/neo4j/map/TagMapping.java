package bookBook.neo4j.map;

import io.vertx.core.json.JsonArray;
import io.vertx.core.json.JsonObject;

/**
 * Created by DMitin on 19.03.2016.
 */
public class TagMapping {
    public static JsonArray mapAllTags(JsonArray data) {
        JsonArray tagsMapped = new JsonArray();
        data.forEach(dataItem -> {
            JsonArray dataItemJson = (JsonArray) dataItem;
            //System.out.println("dataItemJson: " + dataItemJson);
            JsonObject data0 = dataItemJson.getJsonObject(0);
            System.out.println("data0: " + data0);


            JsonObject tagJsonMapped = new JsonObject();
            tagJsonMapped.put("id", data0.getJsonObject("metadata").getLong("id"));
            tagJsonMapped.put("name", data0.getJsonObject("data").getString("name"));
            tagsMapped.add(tagsMapped);





            /*
            JsonArray data0 = dataItemJson.getJsonArray(0);
            System.out.println("data0: " + data0);
            */


            //JsonObject book = data0.getJsonObject(0);
            /*
            JsonObject tagJson = (JsonObject) tag;
            JsonObject tagJsonMapped = new JsonObject();
            tagJsonMapped.put("id", tagJson.getJsonObject("metadata").getLong("id"));
            tagJsonMapped.put("name", tagJson.getJsonObject("data").getString("name"));
            tagsMapped.add(tagsMapped);
            */
        });

        System.out.println("return tagsMapped");
        return tagsMapped;
    }
}
