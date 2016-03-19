package bookBook.router.book;

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

            /*
            eb.send("neo4j.book.searchBook", new JsonObject(), neo4jResponse -> {
                rc.response().putHeader("Content-type", "application/json; charset=utf-8");
                rc.response().putHeader("Access-Control-Allow-Origin", "*");
                rc.response().end(neo4jResponse.result().body().toString());
            });
            */


            rc.response().putHeader("Access-Control-Allow-Origin", "*");
            rc.response().end(responses.get(searchResponse));

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
            eb.send("neo4j.book.addBook", json, neo4jResponse -> {
                rc.response().putHeader("Content-type", "application/json; charset=utf-8");
                rc.response().putHeader("Access-Control-Allow-Origin", "*");
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
                .method(HttpMethod.PUT).handler(rc -> {


            Long id = Long.valueOf(rc.request().getParam("id"));
            System.out.println("id: " + id);
            JsonObject json = rc.getBodyAsJson();
            System.out.println("json: " + json);

            JsonObject data = new JsonObject();
            if (json.getString("id") == null) {
                data.put("bookId", id);
                data.put("name", json.getString("name"));
                System.out.println("data: " + data);

                eb.send("neo4j.book.addNewTag", data, neo4jResponse -> {
                    rc.response().putHeader("Content-type", "application/json; charset=utf-8");
                    rc.response().putHeader("Access-Control-Allow-Origin", "*");
                    rc.response().end(neo4jResponse.result().body().toString());
                });

                //rc.response().end("ok");
            } else {
                String tagId = json.getString("id");
                data.put("bookId", id);
                data.put("tagId", id);
                eb.send("neo4j.book.addExistingTag", data, neo4jResponse -> {
                    rc.response().putHeader("Content-type", "application/json; charset=utf-8");
                    rc.response().putHeader("Access-Control-Allow-Origin", "*");
                    rc.response().end(neo4jResponse.result().body().toString());
                });
            }
        });


        }
    }
