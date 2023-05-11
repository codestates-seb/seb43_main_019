package com.osdoor.aircamp.payment.global;

import com.osdoor.aircamp.payment.kakaoPay.dto.KakaoResponseDto;

public interface PaymentTypeFacade {
    KakaoResponseDto.Request request(long reservationId);
    KakaoResponseDto.Approve approve(String tid, String pgToken, Long reservationId);
}
