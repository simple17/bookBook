package bookBook.neo4j;

import io.vertx.core.AbstractVerticle;
import io.vertx.core.eventbus.EventBus;
import io.vertx.core.http.HttpClient;
import io.vertx.core.http.HttpClientOptions;
import io.vertx.core.http.HttpClientRequest;
import io.vertx.core.json.JsonObject;

import java.util.Base64;

public class Neo4j extends AbstractVerticle {

    public static final String EVENT_NAME = "neo4j.runCypher";
	public static final String ALL_KEY_SEARCH = "_!all_";

	@Override
	public void start() {

		System.out.println("START NEO4J VERTICLE");

		String userName = "neo4j";
        String pass = "secr8t";
        String host = "localhost";
        int port = 7474;


		String authStr = userName + ":" + pass;
		Base64.Encoder e = Base64.getEncoder();
		String encoded = e.encodeToString(authStr.getBytes());

		HttpClientOptions options = new HttpClientOptions()
			.setDefaultPort(port)
			.setDefaultHost(host);

		HttpClient neo4j = vertx.createHttpClient(options);

		/*
		 * Проверка подключения к neo4j при запуске
		 */
		HttpClientRequest request = neo4j.get("/user/neo4j", resp-> {
			resp.bodyHandler(totalBuffer -> {
				// Now all the body has been read
				int status = resp.statusCode();
				if (status == 200) {
					System.out.println("BookBook подключен к neo4j");
				} else {
					System.out.println("Не удалось подключиться к neo4j с именем пользователя: " + userName
							+ " и паролём: " + pass);
					//JsonObject neo4jAuthResponse = new JsonObject(totalBuffer.toString());
					System.out.println("Ответ сервера: " + totalBuffer);
				}
			});
		});
		request.putHeader("Authorization", "Basic " + encoded);
		request.end();


		EventBus eb = vertx.eventBus();

        eb.consumer(EVENT_NAME, runCypherMessage -> {
            HttpClientRequest createNodeRequest = neo4j.post("/db/data/cypher", nodeResp-> {
				int statusCode = nodeResp.statusCode();
				if (statusCode == 200) {
					/*
					 * Удачно сохранили в neo4j
					 */
					nodeResp.bodyHandler(totalBuffer ->
						runCypherMessage.reply(new JsonObject(totalBuffer.toString())));
				} else {
					/*
					 * Ошибка при сохранении в neo4j
					 */
					nodeResp.bodyHandler(totalBuffer -> {

						JsonObject neo4jResponseFail = new JsonObject(totalBuffer.toString());
					    System.err.println(neo4jResponseFail);
					    runCypherMessage.fail(statusCode, neo4jResponseFail.getString("message"));
					 });
				  }
			  });

			  JsonObject jsonBody = (JsonObject) runCypherMessage.body();
			  createNodeRequest.putHeader("Authorization", "Basic " + encoded);
			  createNodeRequest.end(jsonBody.toString());

		 });
	}
}
