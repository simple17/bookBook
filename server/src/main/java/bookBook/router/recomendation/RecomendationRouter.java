package bookBook.router.recomendation;

import io.vertx.core.Vertx;
import io.vertx.core.eventbus.EventBus;
import io.vertx.core.http.HttpMethod;
import io.vertx.core.json.JsonObject;
import io.vertx.ext.web.Router;

/**
 * Created by DMitin on 20.03.2016.
 */
public class RecomendationRouter {
    public static void initRecomendationRouter(Router router, Vertx vertx){

        EventBus eb = vertx.eventBus();

        router.route()
                .path("/:bookId")
                .method(HttpMethod.GET).handler(rc -> {

            System.out.println("/recomendation/");
            Long bookId = Long.valueOf(rc.request().getParam("bookId"));


            eb.send("neo4j.recomendation.get", bookId, neo4jResponse -> {
                rc.response().putHeader("Content-type", "application/json; charset=utf-8");
                rc.response().putHeader("Access-Control-Allow-Origin", "*");
                rc.response().end(neo4jResponse.result().body().toString());
            });


/*
            rc.response().putHeader("Access-Control-Allow-Origin", "*");
            rc.response().end(responses.get(allTags));
*/

//            rc.response().end("ok");
        });
    }
}
