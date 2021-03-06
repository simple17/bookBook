package bookBook.neo4j;

import bookBook.neo4j.map.BookMapping;
import bookBook.neo4j.map.TagMapping;
import io.vertx.core.AbstractVerticle;
import io.vertx.core.eventbus.EventBus;
import io.vertx.core.json.JsonArray;
import io.vertx.core.json.JsonObject;

/**
 * Высокоуровневое (бизнес) запросы к neo4j.
 * 1. Подготовка cypher запроса
 * 2. Mapping значения, вернувшегося из neo4j
 *
 * @author DMitin
 *
 */
public class Neo4jApi extends AbstractVerticle {

	@Override
	public void start() {

		EventBus eb = vertx.eventBus();

		/*
		 * Сохранение сотрудника в neo4j
		 */
		String addBookQuery = "CREATE (b:Book { props } ) return id(b)";
        String searchBookQuery = "MATCH (n:Book) RETURN n";
        //String getBookById = "MATCH b WHERE id(b)={bookId}  RETURN b";
        //String getBookById = "MATCH b-[:WROTE]-a WHERE id(b)={bookId} RETURN b, collect(distinct a)";
        //String getBookById = "START b=NODE({bookId}) OPTIONAL MATCH b-[:WROTE]-a OPTIONAL MATCH b-[:HAS_TAG]-t RETURN b, collect(distinct a), collect(distinct t)";
        String getBookById = "START b=NODE({bookId}) OPTIONAL MATCH b-[:WROTE]-a OPTIONAL MATCH b-[:HAS_TAG]-t OPTIONAL MATCH b-[:HAS_COMMENT]-c RETURN b, collect(distinct a), collect(distinct t), collect(distinct c)";

        String addNewAuthor = "START b=NODE({bookId}) CREATE (b)<-[:WROTE]-(a:Author {fio: {fio}}) return a";
        String addNewTag = "START b=NODE({bookId}) CREATE (b)-[:HAS_TAG]->(t:Tag {name: {name}}) return t";
        String addExistingTag = "START b=NODE({bookId}), t=NODE({tagId}) CREATE (b)-[:HAS_TAG]->(t) return t";

        String deleteTag = "START b=NODE({bookId}), t=NODE({tagId}) MATCH b-[line]-t DELETE line";
        String setRating = "START b=NODE({bookId}) SET b.rating = {ratingVal}";
        String setImageUrl = "START b=NODE({bookId}) SET b.imageUrl = {imageUrl}";
        String getRecomendation = "START b1 = NODE({bookId}) MATCH (b1)-[:HAS_TAG]-(tags)-[:HAS_TAG]-(b2) WHERE NOT b1 = b2 return b2, count(distinct tags) as tagNumber ORDER BY tagNumber DESC LIMIT 5";

		JsonObject queryTemplate = new JsonObject()
                .put("params", new JsonObject());



        String getAllTags = "MATCH (n:Tag) RETURN n";


        /**
         * Добавление книги
         */
		eb.consumer("neo4j.book.addBook", addBookMessage -> {


            JsonObject bookData = (JsonObject) addBookMessage.body();
/*
            String title = bookData.getString("title");
            System.out.println("title: " + title);
            JsonArray authors = bookData.getJsonArray("authors");
            System.out.println("authors: " + authors);
            String query = CypherFactory.createQuery(title, authors, null);
*/

			JsonObject req = new JsonObject(queryTemplate.toString());
			req.getJsonObject("params").put("props", bookData);
            req.put("query", addBookQuery);

			eb.send("neo4j.runCypher", req, cypherResponse -> {

				if (cypherResponse.succeeded()) {
					// удачно сохранили в neo4j, надо достать и отправить id
					JsonObject neo4jResponseData = (JsonObject) cypherResponse.result().body();
					Integer id = neo4jResponseData.getJsonArray("data").getJsonArray(0).getInteger(0);
				    JsonObject eventResponse = new JsonObject().put("id", id);
				    addBookMessage.reply(eventResponse);
				 } else {
					 // сохранение с ошибкой, отправлям fail
					 addBookMessage.fail(0, cypherResponse.cause().getMessage());
				 }
			});
		});

        eb.consumer("neo4j.book.searchBook", searchBookMessage -> {

            JsonObject searchData = (JsonObject) searchBookMessage.body();
            JsonObject req = new JsonObject(queryTemplate.toString());
            //req.getJsonObject("params").put("props", bookData);
            JsonArray tags = searchData.getJsonArray("tags");
            String name = searchData.getString("name");
            String query = CypherFactory.createQuery(name, tags);
            req.put("query", query);

            System.out.println("neo4j.book.searchBook: " + req);

            eb.send("neo4j.runCypher", req, cypherResponse -> {

                if (cypherResponse.succeeded()) {
                    // удачно сохранили в neo4j, надо достать и отправить id
                    JsonObject neo4jResponseData = (JsonObject) cypherResponse.result().body();
                    String resp = neo4jResponseData.toString();
                    searchBookMessage.reply(resp);
                } else {
                    // сохранение с ошибкой, отправлям fail
                    searchBookMessage.fail(0, cypherResponse.cause().getMessage());
                }
            });

            //searchBookMessage.reply("ok");
        });


        /*
            Получит книгу по id
         */
        eb.consumer("neo4j.book.getById", getByIdMessage -> {
            Long id = (Long) getByIdMessage.body();

            JsonObject req = new JsonObject(queryTemplate.toString());

            req.getJsonObject("params").put("bookId", id);
            req.put("query", getBookById);

            System.out.println("neo4j.book.getById: " + req);
            eb.send("neo4j.runCypher", req, cypherResponse -> {

                if (cypherResponse.succeeded()) {
                    // удачно сохранили в neo4j, надо достать и отправить id
                    JsonObject neo4jResponseData = (JsonObject) cypherResponse.result().body();
                    JsonArray data = neo4jResponseData.getJsonArray("data");
                    JsonObject response = BookMapping.mapBookById(data);

                    String resp = data.toString();
                    getByIdMessage.reply(resp);
                } else {
                    // сохранение с ошибкой, отправлям fail
                    getByIdMessage.fail(0, cypherResponse.cause().getMessage());
                }
            });
        });


        /*
            Добавить нового автора
         */
        eb.consumer("neo4j.book.addNewAuthor", getByIdMessage -> {
            JsonObject data = (JsonObject) getByIdMessage.body();
            System.out.println("neo4j.book.addNewAuthor: " + data);

            JsonObject req = new JsonObject(queryTemplate.toString());


            req.getJsonObject("params").put("bookId", data.getLong("bookId"));
            req.getJsonObject("params").put("fio", data.getString("fio"));
            req.put("query", addNewAuthor);

            System.out.println("neo4j.book.getById: " + req);

            eb.send("neo4j.runCypher", req, cypherResponse -> {

                if (cypherResponse.succeeded()) {
                    // удачно сохранили в neo4j, надо достать и отправить id
                    JsonObject neo4jResponseData = (JsonObject) cypherResponse.result().body();
                    String resp = neo4jResponseData.toString();
                    getByIdMessage.reply(resp);
                } else {
                    // сохранение с ошибкой, отправлям fail
                    getByIdMessage.fail(0, cypherResponse.cause().getMessage());
                }
            });


            //getByIdMessage.reply("ok");
        });


        /*
            Добавить новый тэг к книге
         */
        eb.consumer("neo4j.book.addNewTag", getByIdMessage -> {
            JsonObject data = (JsonObject) getByIdMessage.body();
            System.out.println("neo4j.book.addNewAuthor: " + data);

            JsonObject req = new JsonObject(queryTemplate.toString());


            req.getJsonObject("params").put("bookId", data.getLong("bookId"));
            req.getJsonObject("params").put("name", data.getString("name"));
            req.put("query", addNewTag);

            System.out.println("neo4j.book.addNewTag: " + req);


            eb.send("neo4j.runCypher", req, cypherResponse -> {

                if (cypherResponse.succeeded()) {
                    // удачно сохранили в neo4j, надо достать и отправить id
                    JsonObject neo4jResponseData = (JsonObject) cypherResponse.result().body();
                    String resp = neo4jResponseData.toString();
                    getByIdMessage.reply(resp);
                } else {
                    // сохранение с ошибкой, отправлям fail
                    getByIdMessage.fail(0, cypherResponse.cause().getMessage());
                }
            });
        });

        eb.consumer("neo4j.book.addExistingTag", getByIdMessage -> {
            JsonObject data = (JsonObject) getByIdMessage.body();
            System.out.println("neo4j.book.addExistingTag: " + data);

            JsonObject req = new JsonObject(queryTemplate.toString());
            req.getJsonObject("params").put("bookId", data.getLong("bookId"));
            req.getJsonObject("params").put("tagId", data.getLong("tagId"));
            req.put("query", addExistingTag);

            System.out.println("neo4j.book.addExistingTag: " + req);
            eb.send("neo4j.runCypher", req, cypherResponse -> {

                if (cypherResponse.succeeded()) {
                    // удачно сохранили в neo4j, надо достать и отправить id
                    JsonObject neo4jResponseData = (JsonObject) cypherResponse.result().body();
                    String resp = neo4jResponseData.toString();
                    getByIdMessage.reply(resp);
                } else {
                    // сохранение с ошибкой, отправлям fail
                    getByIdMessage.fail(0, cypherResponse.cause().getMessage());
                }
            });

            //getByIdMessage.reply("ok");
        });


        eb.consumer("neo4j.book.deleteTag", getByIdMessage -> {
            JsonObject data = (JsonObject) getByIdMessage.body();
            System.out.println("neo4j.book.deleteTag: " + data);

            JsonObject req = new JsonObject(queryTemplate.toString());
            req.getJsonObject("params").put("bookId", data.getLong("bookId"));
            req.getJsonObject("params").put("tagId", data.getLong("tagId"));
            req.put("query", deleteTag);

            System.out.println("neo4j.book.deleteTag: " + req);

            eb.send("neo4j.runCypher", req, cypherResponse -> {

                if (cypherResponse.succeeded()) {
                    // удачно сохранили в neo4j, надо достать и отправить id
                    JsonObject neo4jResponseData = (JsonObject) cypherResponse.result().body();
                    String resp = neo4jResponseData.toString();
                    getByIdMessage.reply(resp);
                } else {
                    // сохранение с ошибкой, отправлям fail
                    getByIdMessage.fail(0, cypherResponse.cause().getMessage());
                }
            });

            //getByIdMessage.reply("ok");

        });


        /*
            Получить все тэги
         */
        eb.consumer("neo4j.book.getAllTags", getByIdMessage -> {

            JsonObject req = new JsonObject(queryTemplate.toString());
            req.put("query", getAllTags);

            System.out.println("neo4j.book.getAllTags: " + req);
            eb.send("neo4j.runCypher", req, cypherResponse -> {

                if (cypherResponse.succeeded()) {
                    // удачно сохранили в neo4j, надо достать и отправить id
                    JsonObject neo4jResponseData = (JsonObject) cypherResponse.result().body();
                    JsonArray tags = neo4jResponseData.getJsonArray("data");
                    System.out.println("tags: " + tags);
                    JsonArray tagsMapped = TagMapping.mapAllTags(tags);
                    String resp = tagsMapped.toString();

                    //String resp = neo4jResponseData.toString();
                    getByIdMessage.reply(resp);
                } else {
                    // сохранение с ошибкой, отправлям fail
                    getByIdMessage.fail(0, cypherResponse.cause().getMessage());
                }
            });

            //getByIdMessage.reply("ok");
        });


        eb.consumer("neo4j.book.setRating", getByIdMessage -> {

            JsonObject data = (JsonObject) getByIdMessage.body();
            System.out.println("neo4j.book.deleteTag: " + data);

            JsonObject req = new JsonObject(queryTemplate.toString());
            req.getJsonObject("params").put("bookId", data.getLong("bookId"));
            req.getJsonObject("params").put("ratingVal", data.getLong("ratingVal"));
            req.put("query", setRating);

            System.out.println("neo4j.book.setRating: " + req);
            eb.send("neo4j.runCypher", req, cypherResponse -> {

                if (cypherResponse.succeeded()) {
                    // удачно сохранили в neo4j, надо достать и отправить id
                    JsonObject neo4jResponseData = (JsonObject) cypherResponse.result().body();
                    String resp = neo4jResponseData.toString();
                    getByIdMessage.reply(resp);
                } else {
                    // сохранение с ошибкой, отправлям fail
                    getByIdMessage.fail(0, cypherResponse.cause().getMessage());
                }
            });


            //getByIdMessage.reply("ok");
        });

        eb.consumer("neo4j.recomendation.get", getByIdMessage -> {

            Long bookId = (Long) getByIdMessage.body();
            JsonObject req = new JsonObject(queryTemplate.toString());
            req.getJsonObject("params").put("bookId", bookId);
            req.put("query", getRecomendation);

            System.out.println("neo4j.recomendation.get: " + req);

            eb.send("neo4j.runCypher", req, cypherResponse -> {

                if (cypherResponse.succeeded()) {
                    // удачно сохранили в neo4j, надо достать и отправить id
                    JsonObject neo4jResponseData = (JsonObject) cypherResponse.result().body();
                    String resp = neo4jResponseData.toString();
                    getByIdMessage.reply(resp);
                } else {
                    // сохранение с ошибкой, отправлям fail
                    getByIdMessage.fail(0, cypherResponse.cause().getMessage());
                }
            });



            //getByIdMessage.reply("ok");
        });


        eb.consumer("neo4j.book.changeImage", getByIdMessage -> {
            JsonObject data = (JsonObject) getByIdMessage.body();
            System.out.println("neo4j.book.changeImage: " + data);

            JsonObject req = new JsonObject(queryTemplate.toString());
            req.getJsonObject("params").put("bookId", data.getLong("bookId"));
            req.getJsonObject("params").put("imageUrl", data.getString("imageUrl"));
            req.put("query", setImageUrl);

            System.out.println("neo4j.recomendation.get: " + req);

            eb.send("neo4j.runCypher", req, cypherResponse -> {

                if (cypherResponse.succeeded()) {
                    // удачно сохранили в neo4j, надо достать и отправить id
                    JsonObject neo4jResponseData = (JsonObject) cypherResponse.result().body();
                    String resp = neo4jResponseData.toString();
                    getByIdMessage.reply(resp);
                } else {
                    // сохранение с ошибкой, отправлям fail
                    getByIdMessage.fail(0, cypherResponse.cause().getMessage());
                }
            });

        });

	}

}
