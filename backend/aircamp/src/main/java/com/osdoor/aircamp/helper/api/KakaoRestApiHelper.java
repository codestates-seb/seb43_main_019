package com.osdoor.aircamp.helper.api;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.osdoor.aircamp.common.exception.BusinessLogicException;
import com.osdoor.aircamp.common.exception.ExceptionCode;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.net.URI;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

@Slf4j
@Component
public class KakaoRestApiHelper {

    @Value("${spring.security.oauth2.client.registration.kakao.client-id}")
    private String apiKey;

    public String[] getCoordinateFromAddress(String address) {
        String apiUrl = "https://dapi.kakao.com/v2/local/search/address.json";
        try {
            RestTemplate restTemplate = new RestTemplate();

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.set("Authorization", "KakaoAK " + apiKey);

            String url = apiUrl + "?query=" + URLEncoder.encode(address, StandardCharsets.UTF_8);
            RequestEntity<Void> requestEntity = new RequestEntity<>(headers, HttpMethod.GET, URI.create(url));

            ResponseEntity<String> responseEntity = restTemplate.exchange(requestEntity, String.class);
            String responseBody = responseEntity.getBody();

            Gson gson = new Gson();
            JsonObject jsonObject = gson.fromJson(responseBody, JsonObject.class);

            JsonObject document = jsonObject.getAsJsonArray("documents").get(0).getAsJsonObject();

            String x = document.getAsJsonPrimitive("x").getAsString();
            String y = document.getAsJsonPrimitive("y").getAsString();

            return new String[]{x, y};
        } catch (Exception e) {
            log.info("# getCoordinateFromAddress Exception={}", e.getMessage());
        }

        throw new BusinessLogicException(ExceptionCode.ADDRESS_NOT_FOUND);
    }
}
