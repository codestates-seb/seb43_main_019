package com.osdoor.aircamp.payment.kakaoPay.service.approve;

import com.osdoor.aircamp.payment.kakaoPay.dto.KakaoResponseDto;

public interface KakaoPayApprove {

    KakaoResponseDto.Approve approveOneTime(String tid, String pgToken, Long reservationId);
    KakaoResponseDto.Approve approveSubscription(String tid, String pgToken, Long reservationId);
}
