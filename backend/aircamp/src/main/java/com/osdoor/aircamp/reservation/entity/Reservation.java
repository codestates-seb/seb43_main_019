package com.osdoor.aircamp.reservation.entity;

import com.osdoor.aircamp.audit.Auditable;
import com.osdoor.aircamp.member.entity.Member;
import com.osdoor.aircamp.payment.entity.Payment;
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

    @Enumerated(EnumType.STRING)
    private ReservationStatus reservationStatus = ReservationStatus.RESERVATION_REQUEST;

    @Column(nullable = false)
    private boolean deleted = false;

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    @ManyToOne
    @JoinColumn(name = "PRODUCT_ID")
    private Product product;

    @OneToOne
    @JoinColumn(name = "PAYMENT_ID")
    private Payment payment;

    public void setMember(Member member) {
        this.member = member;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public void setPayment(Payment payment) {
        this.payment = payment;
        payment.setReservation(this); // reservation <-> payment 간 양방향 연관관계 설정
    }

    public enum ReservationStatus {
        RESERVATION_REQUEST(1, "예약 요청"), // TODO : 삭제해도 괜찮을지 멘토님께 물어보기
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
}

