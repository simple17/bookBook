package bookBook;

import bookBook.router.RestApiRouter;
import io.vertx.core.AbstractVerticle;
import io.vertx.core.Future;
import io.vertx.core.http.HttpMethod;
import io.vertx.ext.web.Router;
import io.vertx.ext.web.handler.StaticHandler;

public class Server extends AbstractVerticle {

    @Override
    public void start(Future<Void> fut) {

        vertx.deployVerticle("bookBook.neo4j.Neo4j");
        vertx.deployVerticle("bookBook.neo4j.Neo4jApi");

        int port = config().getInteger("http.port", 8080);
        System.out.println(port);

        Router router = Router.router(vertx);
        Router restAPI = Router.router(vertx);
        RestApiRouter.initRestRouter(restAPI, vertx);
        router.mountSubRouter("/rest", restAPI);
        router.route("/images/*").handler(StaticHandler.create("file-uploads"));

        vertx
            .createHttpServer()
            .requestHandler(router::accept)
            .listen(port);

        System.out.println("Book Book server started on port: " + port);
    }
}
