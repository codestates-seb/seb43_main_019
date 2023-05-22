package com.osdoor.aircamp.reservation.entity;

import com.osdoor.aircamp.audit.Auditable;
import com.osdoor.aircamp.member.entity.Member;
import com.osdoor.aircamp.product.entity.Product;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;

@NoArgsConstructor
@Getter
@Setter
@Entity(name = "RESERVATIONS")
public class Reservation extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long reservationId;

    @Column(nullable = false)
    private LocalDate reservationDate; // 캠핑장 이용일자

    @Column(length = 50, nullable = false)
    private String reservationName; // 예약자명

    @Column(length = 20, nullable = false)
    private String reservationPhone;

    @Column(length = 100, nullable = false)
    private String reservationEmail; // 예약자 이메일

    @Column(nullable = false)
    private Integer usedRewardPoints; // 사용한 적립금

    @Column(nullable = false)
    private Integer actualPaymentAmount; // 실 결제 금액

    @Column
    private LocalDate paymentDate; // 결제일

    @Enumerated(EnumType.STRING)
    private ReservationStatus reservationStatus = ReservationStatus.RESERVATION_REQUEST;

    @Column(nullable = false)
    private boolean deleted = false;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "PRODUCT_ID")
    private Product product;

    public void setMember(Member member) {
        this.member = member;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public void setReservationStatus(ReservationStatus reservationStatus) {
        this.reservationStatus = reservationStatus;
    }
}

