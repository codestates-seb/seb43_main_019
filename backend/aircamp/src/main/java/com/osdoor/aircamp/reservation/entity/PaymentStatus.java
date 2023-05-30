package com.osdoor.aircamp.reservation.entity;

import lombok.Getter;

public enum PaymentStatus {
    NOT_PAYMENT(1, "결제 전"),
    COMPLETED(2, "결제 완료"),
    CANCEL(3, "결제 취소");

    @Getter
    private int code;

    @Getter
    private String status;

    PaymentStatus(int code, String status) {
        this.code = code;
        this.status = status;
    }
}
