package bookBook.router.tag;

import io.vertx.core.Vertx;
import io.vertx.core.http.HttpMethod;
import io.vertx.core.json.JsonObject;
import io.vertx.ext.web.Router;

/**
 * Created by DMitin on 19.03.2016.
 */
public class TagRouter {
    public static void initTagRouter(Router router, Vertx vertx){

        router.route()
                .path("/all")
                .method(HttpMethod.GET).handler(rc -> {

            System.out.println("/tag/all");

            /*
            eb.send("neo4j.book.searchBook", new JsonObject(), neo4jResponse -> {
                rc.response().putHeader("Content-type", "application/json; charset=utf-8");
                rc.response().putHeader("Access-Control-Allow-Origin", "*");
                rc.response().end(neo4jResponse.result().body().toString());
            });
            */

            /*
            rc.response().putHeader("Access-Control-Allow-Origin", "*");
            rc.response().end(responses.get(searchResponse));
            */

            rc.response().end("ok");
        });

    }
}
