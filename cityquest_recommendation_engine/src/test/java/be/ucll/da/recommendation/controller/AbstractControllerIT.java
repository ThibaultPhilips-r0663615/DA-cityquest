package be.ucll.da.recommendation.controller;

import be.ucll.da.recommendation.Application;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit4.SpringRunner;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = Application.class, webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class AbstractControllerIT {

	@LocalServerPort
	private int port;

	private TestRestTemplate restTemplate;
	private HttpHeaders headers;

	public AbstractControllerIT() {
		this.headers = new HttpHeaders();
		this.headers.add(HttpHeaders.CONTENT_TYPE, "application/json");
		restTemplate = new TestRestTemplate(new RestTemplateBuilder()
				.setConnectTimeout(5000)
				.setReadTimeout(5000));
	}

	protected ResponseEntity<String> httpGet(String url) {
		HttpEntity<String> entity = new HttpEntity<String>(null, headers);

		return restTemplate.exchange(
				createURLWithPort(url),
				HttpMethod.GET, entity, String.class);
	}

	protected ResponseEntity<String> httpPost(String url, Object obj) {
		return httpRequest(url, obj, HttpMethod.POST);
	}

	protected ResponseEntity<String> httpPut(String url, Object obj){
		return httpRequest(url, obj, HttpMethod.PUT);
	}

	private ResponseEntity<String> httpRequest(String url, Object obj, HttpMethod method){
		try {
			ObjectMapper mapper = new ObjectMapper();
			String payload = mapper.writeValueAsString(obj);
			HttpEntity<String> entity = new HttpEntity<String>(payload, headers);

			return restTemplate.exchange(
					createURLWithPort(url),
					method, entity, String.class);
		} catch (JsonProcessingException e) {
			throw new RuntimeException(e);
		}
	}

	protected String jsonTestFile(String fileName) {
		try {
			return new String(Files.readAllBytes(Paths.get("src/test/resources/" + fileName)));
		} catch (IOException e) {
			throw new RuntimeException(e);
		}
	}

	private String createURLWithPort(String uri) {
		if(uri.startsWith("http")) return uri;
		return "http://localhost:" + port + "/recommendation" + uri;
	}
}
