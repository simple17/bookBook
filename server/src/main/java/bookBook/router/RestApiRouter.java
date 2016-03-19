package bookBook.router;

import io.vertx.core.Vertx;
import io.vertx.core.file.FileSystem;
import io.vertx.core.http.HttpMethod;
import io.vertx.ext.web.Router;

import java.util.HashMap;
import java.util.Map;

import static bookBook.Util.println;



/**
 * Created by DMitin on 19.03.2016.
 */
public class RestApiRouter {

    public static void initRestRouter(Router router, Vertx vertx){


        FileSystem fs = vertx.fileSystem();
        String searchResponse = "../doc/4.8-bookSearch-response.json";
        Map<String,String> responses = new HashMap<>();


        fs.readFile(searchResponse, res-> {
            if (res.succeeded()) {
                System.out.println(searchResponse + " read");
                responses.put(searchResponse, res.result().toString());
                System.out.println(responses.get(searchResponse));
            } else {
                System.out.println(searchResponse + " read error");
            }
        });


        router.route()
                .path("/book/search")
                .method(HttpMethod.GET).handler(rc -> {

            /*
            rc.response().putHeader("Content-Type", "application/json");
            String id = rc.request().getParam("id");
            eb.send("es.getUserById", id, neo4jResponse -> {
                rc.response().putHeader("Content-type", "application/json; charset=utf-8");
                rc.response().end(neo4jResponse.result().body().toString());
            });
            */
            rc.response().end(responses.get(searchResponse));
        });
    }
}
