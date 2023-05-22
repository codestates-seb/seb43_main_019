package com.osdoor.aircamp.reservation.entity;

import lombok.Getter;

public enum ReservationStatus {
    RESERVATION_REQUEST(1, "예약 요청"),
    RESERVATION_IN_PROGRESS(2, "예약 진행 중"),
    RESERVATION_COMPLETE(3, "예약 완료"),
    RESERVATION_CANCEL(4, "예약 취소");

    @Getter
    private int stepNumber;

    @Getter
    private String stepDescription;

    ReservationStatus(int stepNumber, String stepDescription) {
        this.stepNumber = stepNumber;
        this.stepDescription = stepDescription;
    }
}
