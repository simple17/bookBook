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

		/*
		String body = "neo4j:neo4j";
		Base64.Encoder e = Base64.getEncoder();
		String encoded = e.encodeToString(body.getBytes());

		HttpClientOptions options = new HttpClientOptions()
			.setDefaultPort(7474)
			.setDefaultHost("localhost");

		HttpClient neo4j = vertx.createHttpClient(options);
		*/

		String host = config().getString("neo4j.host");
		System.out.println("neo4j хост: " + host);

		int port = config().getInteger("neo4j.port");
		System.out.println("neo4j порт: " + port);

		String userName = config().getString("neo4j.user");
		System.out.println("имя пользователя: " + userName);

		String pass = config().getString("neo4j.newPassword");
		System.out.println("пароль: " + pass);

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
					System.out.println("Подключено к neo4j");
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
