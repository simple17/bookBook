package bookBook;

import io.vertx.core.AbstractVerticle;
import io.vertx.core.Future;
import io.vertx.core.file.FileSystem;
import io.vertx.core.logging.Logger;
import io.vertx.core.logging.LoggerFactory;


/**
 * Created by DMitin on 18.03.2016.
 */
public class MockServer extends AbstractVerticle {
    @Override
    public void start(Future<Void> fut) {

        Logger logger = LoggerFactory.getLogger(MockServer.class.getName());

        FileSystem fs = vertx.fileSystem();
        fs.readFile("foo.txt", res-> {
            if (res.succeeded()) {
                logger.debug("foo.txt read");
            } else {
                logger.error("foo.txt read error");
            }
        });
        /*
        fs.copy("foo.txt", "bar.txt", res -> {
            if (res.succeeded()) {
                logger.debug("foo.txt copied");
            } else {
                logger.error("foo.txt copy error");
            }
        });
        */
    }
}
