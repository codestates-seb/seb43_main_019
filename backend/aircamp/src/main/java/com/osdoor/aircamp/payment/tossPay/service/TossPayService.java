package com.osdoor.aircamp.payment.tossPay.service;

import com.osdoor.aircamp.payment.tossPay.dto.TossApproveDto;
import com.osdoor.aircamp.utils.JsonMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@RequiredArgsConstructor
@Service
public class TossPayService {

    private final RestTemplate restTemplate;
    private static final String TOSS_REQUEST_URL = "https://api.tosspayments.com/v1/payments/confirm";

    public String approve(String paymentKey, String reservationId, int amount) {
        String body = getBody(paymentKey, reservationId, amount);

        HttpEntity<String> generalRequestEntity = new HttpEntity<>(body, getHeader());

        return restTemplate.postForObject(
                TOSS_REQUEST_URL,
                generalRequestEntity,
                String.class
        );
    }

    private String getBody(String paymentKey, String reservationId, int amount) {
        TossApproveDto tossRequestDto = TossApproveDto.builder()
                .paymentKey(paymentKey)
                .reservationId(reservationId)
                .amount(amount)
                .build();

        return JsonMapper.objToString(tossRequestDto);
    }

    public HttpHeaders getHeader() {
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.set("Authorization",
                "Basic dGVzdF9za19rWkxLR1B4NE0zTXFlMkpQTnkyM0JhV3lwdjFvOg==");
        httpHeaders.set("Content-Type", "application/json");
        return httpHeaders;
    }
}