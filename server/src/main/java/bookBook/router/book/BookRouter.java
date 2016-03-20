package bookBook.router.book;

import bookBook.neo4j.CypherFactory;
import io.vertx.core.Vertx;
import io.vertx.core.eventbus.EventBus;
import io.vertx.core.file.FileSystem;
import io.vertx.core.http.HttpMethod;
import io.vertx.core.json.JsonArray;
import io.vertx.core.json.JsonObject;
import io.vertx.ext.web.FileUpload;
import io.vertx.ext.web.Route;
import io.vertx.ext.web.Router;
import org.neo4j.cypherdsl.CypherQuery;

import java.util.HashMap;
import java.util.Map;
import java.util.Set;

/**
 * Created by DMitin on 19.03.2016.
 */
public class BookRouter {
    public static void initBookRouter(Router router, Vertx vertx){

        FileSystem fs = vertx.fileSystem();
        EventBus eb = vertx.eventBus();
        String searchResponse = "../doc/4.8-bookSearch-response.json";
        Map<String,String> responses = new HashMap<>();


        fs.readFile(searchResponse, res -> {
            if (res.succeeded()) {
                System.out.println(searchResponse + " read");
                responses.put(searchResponse, res.result().toString());
            } else {
                System.out.println(searchResponse + " read error");
            }
        });


        String getByIdResponse = "../doc/4.1-getBookById-response.json";
        fs.readFile(getByIdResponse, res -> {
            if (res.succeeded()) {
                System.out.println(getByIdResponse + " read");
                responses.put(getByIdResponse, res.result().toString());
            } else {
                System.out.println(getByIdResponse + " read error");
            }
        });


        /*
            Поиск книг
         */
        router.route()
                .path("/search")
                .method(HttpMethod.POST).handler(rc -> {

            System.out.println("/search");
            JsonObject json = rc.getBodyAsJson();

            eb.send("neo4j.book.searchBook", json, neo4jResponse -> {
                rc.response().putHeader("Content-type", "application/json; charset=utf-8");
                rc.response().putHeader("Access-Control-Allow-Origin", "*");
                rc.response().putHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
                rc.response().end(neo4jResponse.result().body().toString());
            });


/*
            rc.response().putHeader("Access-Control-Allow-Origin", "*");
            rc.response().end(responses.get(searchResponse));
*/
        });

        /*
            Получить книгу по id
         */
        router.route()
                .path("/:id")
                .method(HttpMethod.GET).handler(rc -> {

            Long id = Long.valueOf(rc.request().getParam("id"));


            eb.send("neo4j.book.getById", id, neo4jResponse -> {
                rc.response().putHeader("Content-type", "application/json; charset=utf-8");
                rc.response().putHeader("Access-Control-Allow-Origin", "*");
                rc.response().putHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
                rc.response().end(neo4jResponse.result().body().toString());
            });
            /*
            String responseJson = responses.get(getByIdResponse);
            rc.response().putHeader("Access-Control-Allow-Origin", "*");
            rc.response().end(responseJson);
            */
            //rc.response().end(id.toString());
        });


        /*
            Добавить книгу
         */
        router.route()
                .path("/")
                .method(HttpMethod.POST).handler(rc -> {

            JsonObject json = rc.getBodyAsJson();
            if (json.getLong("rating") == null) {
                json.put("rating", 0);
            }

            json.put("imageUrl", "/images/default.png");

            eb.send("neo4j.book.addBook", json, neo4jResponse -> {
                rc.response().putHeader("Content-type", "application/json; charset=utf-8");
                rc.response().putHeader("Access-Control-Allow-Origin", "*");
                rc.response().putHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
                rc.response().end(neo4jResponse.result().body().toString());
            });

            System.out.println(json.toString());
        });


        /*
            Добавить автора книге
         */
        router.route()
                .path("/:id/author")
                .method(HttpMethod.PUT).handler(rc -> {


            Long id = Long.valueOf(rc.request().getParam("id"));
            System.out.println("id: " + id);
            JsonObject json = rc.getBodyAsJson();
            System.out.println("json: " + json);

            JsonObject data = new JsonObject();
            if (json.getString("id") == null) {
                data.put("bookId", id);
                data.put("fio", json.getString("fio"));
                eb.send("neo4j.book.addNewAuthor", data, neo4jResponse -> {
                    rc.response().putHeader("Content-type", "application/json; charset=utf-8");
                    rc.response().putHeader("Access-Control-Allow-Origin", "*");
                    rc.response().putHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
                    rc.response().end(neo4jResponse.result().body().toString());
                });
            } else {
                rc.response().end("NOT IMPLEMENTED");
            }
        });


        /*
            Добавить тэг книге
         */
        router.route()
                .path("/:id/tag")
                .method(HttpMethod.POST).handler(rc -> {


            Long id = Long.valueOf(rc.request().getParam("id"));
            System.out.println("id: " + id);
            JsonObject json = rc.getBodyAsJson();
            System.out.println("json: " + json);

            JsonObject data = new JsonObject();
            if (json.getLong("id") == null) {
                data.put("bookId", id);
                data.put("name", json.getString("name"));
                System.out.println("data: " + data);

                eb.send("neo4j.book.addNewTag", data, neo4jResponse -> {
                    rc.response().putHeader("Content-type", "application/json; charset=utf-8");
                    rc.response().putHeader("Access-Control-Allow-Origin", "*");
                    rc.response().putHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
                    rc.response().end(neo4jResponse.result().body().toString());
                });

                //rc.response().end("ok");
            } else {
                Long tagId = json.getLong("id");
                data.put("bookId", id);
                data.put("tagId", tagId);
                eb.send("neo4j.book.addExistingTag", data, neo4jResponse -> {
                    rc.response().putHeader("Content-type", "application/json; charset=utf-8");
                    rc.response().putHeader("Access-Control-Allow-Origin", "*");
                    rc.response().putHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
                    rc.response().end(neo4jResponse.result().body().toString());
                });
            }
        });

        /*
            Удалить тэг у книги
         */
        router.route()
                .path("/:bookId/tag/:tagId")
                .method(HttpMethod.POST).handler(rc -> {


            JsonObject queryData = new JsonObject();
            Long bookId = Long.valueOf(rc.request().getParam("bookId"));
            queryData.put("bookId", bookId);
            System.out.println("id: " + bookId);
            Long tagId = Long.valueOf(rc.request().getParam("tagId"));
            queryData.put("tagId", tagId);
            System.out.println("tagId: " + tagId);

            eb.send("neo4j.book.deleteTag", queryData, neo4jResponse -> {
                rc.response().putHeader("Content-type", "application/json; charset=utf-8");
                rc.response().putHeader("Access-Control-Allow-Origin", "*");
                rc.response().putHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
                rc.response().end(neo4jResponse.result().body().toString());
            });

            //rc.response().end("ok");
        });

        router.route()
                .path("/:bookId/rating/:ratingVal")
                .method(HttpMethod.POST).handler(rc -> {


            JsonObject queryData = new JsonObject();
            Long bookId = Long.valueOf(rc.request().getParam("bookId"));
            queryData.put("bookId", bookId);
            System.out.println("bookId: " + bookId);
            Long ratingVal = Long.valueOf(rc.request().getParam("ratingVal"));
            queryData.put("ratingVal", ratingVal);
            System.out.println("ratingVal: " + ratingVal);

            eb.send("neo4j.book.setRating", queryData, neo4jResponse -> {
                rc.response().putHeader("Content-type", "application/json; charset=utf-8");
                rc.response().putHeader("Access-Control-Allow-Origin", "*");
                rc.response().putHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
                rc.response().end(neo4jResponse.result().body().toString());
            });

            //rc.response().end("ok");
        });


        Route uploadEmployeeAvatar = router.route().path("/:bookId/upload");
        uploadEmployeeAvatar.method(HttpMethod.POST);
        uploadEmployeeAvatar.handler(rc -> {
            Set<FileUpload> uploads = rc.fileUploads();
            FileUpload[] uploadsArray = uploads.toArray(new FileUpload[uploads.size()]);
            System.out.print(uploadsArray[0].uploadedFileName());

            String imageUrl = uploadsArray[0].uploadedFileName();
            String realUrl =  imageUrl.replaceAll("file-uploads\\\\", "/images/");
            System.out.println("real url:  " + realUrl);

            Long bookId = Long.valueOf(rc.request().getParam("bookId"));
            JsonObject queryData = new JsonObject();
            queryData.put("bookId", bookId);
            queryData.put("imageUrl", realUrl);

            System.out.println(queryData);

            eb.send("neo4j.book.changeImage", queryData, neo4jResponse -> {
                rc.response().putHeader("Content-type", "application/json; charset=utf-8");
                rc.response().putHeader("Access-Control-Allow-Origin", "*");
                rc.response().putHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
                rc.response().end(realUrl);
            });

            //rc.response().end("file upload");
        });


        }
    }
