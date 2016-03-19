package bookBook.neo4j;

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
        String getBookById = "MATCH b	WHERE id(b)={bookId}  RETURN b";
		JsonObject queryTemplate = new JsonObject()
                .put("params", new JsonObject());


        /**
         * Добавление книги
         */
		eb.consumer("neo4j.book.addBook", addBookMessage -> {

			JsonObject bookData = (JsonObject) addBookMessage.body();
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

            JsonObject bookData = (JsonObject) searchBookMessage.body();
            JsonObject req = new JsonObject(queryTemplate.toString());
            //req.getJsonObject("params").put("props", bookData);
            req.put("query", searchBookQuery);

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
