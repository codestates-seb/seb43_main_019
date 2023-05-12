package com.osdoor.aircamp.payment.kakaoPay.service.request;

import com.osdoor.aircamp.payment.global.ParameterProvider;
import com.osdoor.aircamp.payment.kakaoPay.dto.KakaoResponseDto;
import com.osdoor.aircamp.payment.kakaoPay.dto.KakaoResponseDto.Request;
import com.osdoor.aircamp.payment.kakaoPay.service.KaKaoPayService;
import com.osdoor.aircamp.reservation.entity.Reservation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

@RequiredArgsConstructor
@Service
public class KaKaoPayRequestImpl extends KaKaoPayService implements KakaoPayRequest {

    private final ParameterProvider parameterProvider;
    private final RestTemplate restTemplate;
    private static final String READY_URL = "https//kapi.kakao.com/v1/payment/ready";

    @Override
    public KakaoResponseDto.Request requestOneTime(Reservation reservation) {
        MultiValueMap<String, String> oneTimeReqsParams =
                parameterProvider.getOneTimeReqsParams(reservation);

        return getResponseDtoAboutRequest(oneTimeReqsParams);
    }

    @Override
    public KakaoResponseDto.Request requestSubscription(Reservation reservation) {
        MultiValueMap<String, String> subscriptionReqsParams =
                parameterProvider.getSubscriptionReqsParams(reservation);

        return getResponseDtoAboutRequest(subscriptionReqsParams);
    }

    private KakaoResponseDto.Request getResponseDtoAboutRequest(
            MultiValueMap<String, String> params
    ) {
        HttpEntity<MultiValueMap<String, String>> kakaoRequestEntity
                = new HttpEntity<>(params, super.getHeaders());

        return restTemplate.postForObject(READY_URL, kakaoRequestEntity, Request.class);
    }
}