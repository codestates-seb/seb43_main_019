package com.osdoor.aircamp.reservation.dto;

import com.osdoor.aircamp.reservation.entity.PaymentStatus;
import com.osdoor.aircamp.reservation.entity.ReservationStatus;
import com.osdoor.aircamp.reservation.entity.Reservation;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class ReservationDto {

    private Long reservationId;
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
    private Long memberId;
    private Long productId;

    public static ReservationDto fromEntity(Reservation reservation) {
        ReservationDto dto = new ReservationDto();
        dto.setReservationId(reservation.getReservationId());
        dto.setReservationDate(reservation.getReservationDate());
        dto.setReservationName(reservation.getReservationName());
        dto.setReservationPhone(reservation.getReservationPhone());
        dto.setReservationEmail(reservation.getReservationEmail());
        dto.setUsedRewardPoints(reservation.getUsedRewardPoints());
        dto.setActualPaymentAmount(reservation.getActualPaymentAmount());
        dto.setPaymentDate(reservation.getPaymentDate());
        dto.setReservationStatus(reservation.getReservationStatus());
        dto.setPaymentStatus(reservation.getPaymentStatus());
        dto.setDeleted(reservation.isDeleted());
        if (reservation.getMember() != null) {
            dto.setMemberId(reservation.getMember().getMemberId());
        }
        if (reservation.getProduct() != null) {
            dto.setProductId(reservation.getProduct().getProductId());
        }
        return dto;
    }
}
