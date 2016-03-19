package bookBook.router.tag;

import io.vertx.core.Vertx;
import io.vertx.core.eventbus.EventBus;
import io.vertx.core.file.FileSystem;
import io.vertx.core.http.HttpMethod;
import io.vertx.core.json.JsonObject;
import io.vertx.ext.web.Router;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by DMitin on 19.03.2016.
 */
public class TagRouter {
    public static void initTagRouter(Router router, Vertx vertx){

        FileSystem fs = vertx.fileSystem();
        EventBus eb = vertx.eventBus();
        String allTags = "../doc/all_tags.json";
        Map<String,String> responses = new HashMap<>();


        fs.readFile(allTags, res -> {
            if (res.succeeded()) {
                System.out.println(allTags + " read");
                String allTagsContent = res.result().toString();
                System.out.println(allTagsContent);

                responses.put(allTags, res.result().toString());
            } else {
                System.out.println(allTags + " read error");
            }
        });

        router.route()
                .path("/all")
                .method(HttpMethod.GET).handler(rc -> {

            System.out.println("/tag/all");

/*
            eb.send("neo4j.book.getAllTags", new JsonObject(), neo4jResponse -> {
                rc.response().putHeader("Content-type", "application/json; charset=utf-8");
                rc.response().putHeader("Access-Control-Allow-Origin", "*");
                rc.response().end(neo4jResponse.result().body().toString());
            });
*/


            rc.response().putHeader("Access-Control-Allow-Origin", "*");
            rc.response().end(responses.get(allTags));


            //rc.response().end("ok");
        });

    }
}
