package com.osdoor.aircamp.reservation.dto;

import com.osdoor.aircamp.reservation.entity.PaymentStatus;
import com.osdoor.aircamp.reservation.entity.Reservation;
import com.osdoor.aircamp.reservation.entity.ReservationStatus;
import lombok.Getter;

import java.time.LocalDate;

@Getter
public class ReservationPatchDto {
    private long reservationId;
    private LocalDate reservationDate;
    private String reservationName;
    private String reservationPhone;
    private String reservationEmail;
    private Integer usedRewardPoints;
    private Integer actualPaymentAmount;
    private LocalDate paymentDate;
    private ReservationStatus reservationStatus;
    private PaymentStatus paymentStatus;
    private boolean deleted;

    public void setReservationId(long reservationId) {
        this.reservationId = reservationId;
    }
}

