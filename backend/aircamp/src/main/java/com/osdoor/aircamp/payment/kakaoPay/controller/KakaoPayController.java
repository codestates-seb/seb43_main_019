package com.osdoor.aircamp.payment.kakaoPay.controller;

import com.osdoor.aircamp.exception.BusinessLogicException;
import com.osdoor.aircamp.exception.ExceptionCode;
import com.osdoor.aircamp.payment.global.PaymentTypeFacade;
import com.osdoor.aircamp.payment.kakaoPay.dto.KakaoResponseDto;
import com.osdoor.aircamp.payment.kakaoPay.dto.KakaoResponseDto.Request;
import lombok.RequiredArgsConstructor;
import net.jodah.expiringmap.ExpirationPolicy;
import net.jodah.expiringmap.ExpiringMap;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.concurrent.TimeUnit;

@RequiredArgsConstructor
@RequestMapping("/api/payments")
@RestController
public class KakaoPayController {

    private final PaymentTypeFacade kakaoPaymentFacade;

    public static final ExpiringMap<Long, String> tidStore =
            ExpiringMap.builder()
                    .expirationPolicy(ExpirationPolicy.CREATED)
                    .expiration(3, TimeUnit.MINUTES)
                    .build();

    @GetMapping("/api/payments/kakao/{reservationId}")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public KakaoResponseDto.Request requestPayment(@PathVariable("reservationId") Long reservationId) {
        Request response = kakaoPaymentFacade.request(reservationId);
        saveTid(response, reservationId);

        return response;
    }

    @GetMapping("/api/payments/kakao/approve/{reservationId}")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public KakaoResponseDto.Approve kakaoApprove(
            @RequestParam("pg_token") String pgToken,
            @PathVariable("reservationId") Long reservationId
    ) {
        String tid = getTid(reservationId);
        return kakaoPaymentFacade.approve(tid, pgToken, reservationId);
    }

    @GetMapping("/api/payments/cancel")
    public ResponseEntity cancel() {
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @GetMapping("/api/payments/fail")
    public ResponseEntity fail() {
        return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);
    }

    private void saveTid(Request requestResponse, Long reservationId) {
        tidStore.put(reservationId, requestResponse.getTid());
    }

    private String getTid(Long reservationId) {
        String tid = tidStore.get(reservationId);
        if (tid == null) {
            throw new BusinessLogicException(ExceptionCode.EXPIRED_TID);
        }
        tidStore.remove(reservationId);
        return tid;
    }
}
