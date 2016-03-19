package bookBook.router;

import bookBook.router.book.BookRouter;
import io.vertx.core.Vertx;
import io.vertx.core.file.FileSystem;
import io.vertx.core.http.HttpMethod;
import io.vertx.ext.web.Router;

import java.util.HashMap;
import java.util.Map;


/**
 * Created by DMitin on 19.03.2016.
 */
public class RestApiRouter {

    public static void initRestRouter(Router router, Vertx vertx){

        Router bookAPI = Router.router(vertx);
        BookRouter.initBookRouter(bookAPI, vertx);
        router.mountSubRouter("/book", bookAPI);

    }
}
