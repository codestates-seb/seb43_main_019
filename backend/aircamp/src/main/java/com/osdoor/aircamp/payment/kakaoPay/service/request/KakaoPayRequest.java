package com.osdoor.aircamp.payment.kakaoPay.service.request;

import com.osdoor.aircamp.payment.kakaoPay.dto.KakaoResponseDto;
import com.osdoor.aircamp.reservation.entity.Reservation;

public interface KakaoPayRequest {

    KakaoResponseDto.Request requestOneTime(Reservation reservation);
    KakaoResponseDto.Request requestSubscription(Reservation reservation);
}
