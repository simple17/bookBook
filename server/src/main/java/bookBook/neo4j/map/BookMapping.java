package bookBook.neo4j.map;

import io.vertx.core.json.JsonArray;
import io.vertx.core.json.JsonObject;

/**
 * Created by DMitin on 19.03.2016.
 */
public class BookMapping {

    public static JsonObject mapBookById(JsonArray data) {
        System.out.println("mapBookById: " + data);
        JsonArray data0 = data.getJsonArray(0);
        JsonObject book = data0.getJsonObject(0);
        JsonArray authors = data0.getJsonArray(1);
        JsonArray tags = data0.getJsonArray(2);

        JsonObject bookMapped =  mapBook(book);
        JsonArray authorsMapped = mapAuthors(authors);
        bookMapped.put("authors", authorsMapped);
/*
        JsonArray tagsMapped = mapTags(tags);
        bookMapped.put("tags", tagsMapped);
        System.out.println(book);
*/
        bookMapped.put("comments", new JsonArray());
        return bookMapped;
    }


    public static JsonObject mapBook(JsonObject book){
        Long id = book.getJsonObject("metadata").getLong("id");
        System.out.println("id: " + id );
        String title = book.getJsonObject("data").getString("title");
        System.out.println("title: " + title);

        JsonObject bookJson = new JsonObject();
        bookJson.put("id", id);
        bookJson.put("title", title);
        return bookJson;
    }


    public static JsonArray mapTags(JsonArray authors){
        System.out.println("tags: " + authors);
        JsonArray authorsMapped = new JsonArray();
        return authorsMapped;
    }

    public static JsonArray mapAuthors(JsonArray authors){
        System.out.println("authors: " + authors);
        /*authors.stream().map(author-> {

        });
        */

        JsonArray authorsMapped = new JsonArray();
        authors.forEach(author -> {
            JsonObject authorJson = (JsonObject) author;
            JsonObject authorJsonMapped = new JsonObject();
            authorJsonMapped.put("id", authorJson.getJsonObject("metadata").getLong("id"));
            authorJsonMapped.put("fio", authorJson.getJsonObject("data").getString("fio"));
            authorsMapped.add(authorJsonMapped);
        });

        return authorsMapped;
    }

}
