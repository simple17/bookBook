package bookBook.router;

import bookBook.router.book.BookRouter;
import bookBook.router.recomendation.RecomendationRouter;
import bookBook.router.tag.TagRouter;
import io.vertx.core.Vertx;
import io.vertx.core.file.FileSystem;
import io.vertx.core.http.HttpMethod;
import io.vertx.ext.web.Router;
import io.vertx.ext.web.handler.BodyHandler;

import java.util.HashMap;
import java.util.Map;


/**
 * Created by DMitin on 19.03.2016.
 */
public class RestApiRouter {

    public static void initRestRouter(Router router, Vertx vertx){

        router.route().handler(BodyHandler.create());

        Router bookAPI = Router.router(vertx);
        BookRouter.initBookRouter(bookAPI, vertx);
        router.mountSubRouter("/book", bookAPI);

        Router tagAPI = Router.router(vertx);
        TagRouter.initTagRouter(tagAPI, vertx);
        router.mountSubRouter("/tag", tagAPI);

        Router recomendationAPI = Router.router(vertx);
        RecomendationRouter.initRecomendationRouter(recomendationAPI, vertx);
        router.mountSubRouter("/recomendation", recomendationAPI);

    }
}
