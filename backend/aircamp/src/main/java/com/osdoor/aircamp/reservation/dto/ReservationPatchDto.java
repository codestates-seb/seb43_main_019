package com.osdoor.aircamp.reservation.dto;

import com.osdoor.aircamp.reservation.entity.Reservation;
import com.osdoor.aircamp.reservation.entity.ReservationStatus;
import lombok.Getter;

@Getter
public class ReservationPatchDto {
    private long reservationId;
    private ReservationStatus reservationStatus;

    public void setReservationId(long reservationId) {
        this.reservationId = reservationId;
    }
}

