package com.osdoor.aircamp.reservation.dto;

import com.osdoor.aircamp.reservation.entity.Reservation;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class ReservationResponseDto {
    private long reservationId;

    private LocalDateTime reservationDate;
    private String reservationName;
    private String reservationPhone;
    private String reservationEmail;
    private Reservation.ReservationStatus reservationStatus;
    private LocalDateTime createdAt;
    private String createdBy;

    @Setter(AccessLevel.NONE)
    private String productName;

    @Setter(AccessLevel.NONE)
    private long memberId;

//    public void setProduct(Product product) {
//        this.productName = product.getProductName();
//    }
//
//    public void setMember(Member member) {
//        this.memberId = member.getMemberId();
//    }
}
