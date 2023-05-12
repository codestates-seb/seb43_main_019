package com.osdoor.aircamp.payment.kakaoPay.service;

import org.springframework.http.HttpHeaders;

public abstract class KaKaoPayService {

    public HttpHeaders getHeaders() {
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.add("Authorization", "KakaoAK 15fe252b3ce1d6da44b790e005f40964");
        httpHeaders.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");
        return httpHeaders;
    }
}
