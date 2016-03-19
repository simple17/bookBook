package bookBook;

import bookBook.router.RestApiRouter;
import io.vertx.core.AbstractVerticle;
import io.vertx.core.Future;
import io.vertx.core.http.HttpMethod;
import io.vertx.ext.web.Router;

public class Server extends AbstractVerticle {

    @Override
    public void start(Future<Void> fut) {

        int port = config().getInteger("http.port", 8080);
        System.out.println(port);

        Router router = Router.router(vertx);
        Router restAPI = Router.router(vertx);
        RestApiRouter.initRestRouter(restAPI, vertx);
        router.mountSubRouter("/rest", restAPI);

        vertx
            .createHttpServer()
            .requestHandler(router::accept)
            .listen(port);

        System.out.println("Book Book server started on port: " + port);
    }
}
