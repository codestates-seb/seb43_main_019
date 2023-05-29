package com.osdoor.aircamp.payment.tossPay.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Builder
@Getter
public class TossApproveDto {
    private final String paymentKey;
    private final String reservationId;
    private final int amount;
}

