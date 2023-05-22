package com.osdoor.aircamp.reservation.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ReservationIdResponseDto {
    private Long reservationId;

    public ReservationIdResponseDto(Long reservationId) {
        this.reservationId = reservationId;
    }
}
