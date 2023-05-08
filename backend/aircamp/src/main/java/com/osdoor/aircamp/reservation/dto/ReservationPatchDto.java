package com.osdoor.aircamp.reservation.dto;

import com.osdoor.aircamp.reservation.entity.Reservation;
import lombok.Getter;

@Getter
public class ReservationPatchDto {
    private long reservationId;
    private Reservation.ReservationStatus reservationStatus;

    public void setReservationId(long reservationId) {
        this.reservationId = reservationId;
    }
}
