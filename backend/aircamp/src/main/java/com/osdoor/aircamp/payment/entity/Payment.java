package com.osdoor.aircamp.payment.entity;

import com.osdoor.aircamp.audit.Auditable;
import com.osdoor.aircamp.reservation.entity.Reservation;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@NoArgsConstructor
@Getter
@Setter
@Entity(name = "PAYMENTS")
public class Payment extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long paymentId;

//    @Enumerated(EnumType.STRING) // TODO : 보류
//    @Column(nullable = false)
//    private PaymentStatus status;

    // 결제완료한 날짜
    @Column
    private LocalDateTime paymentDate;

    @Column(nullable = false)
    private BigDecimal usedRewardPoints = BigDecimal.ZERO; // 0으로 초기화

    // 실제 결제 금액
    @Column(nullable = false)
    private BigDecimal actualPaymentAmount; // TODO : 상품금액 - 사용한적립금 계산로직 넣기

    @Column(nullable = false)
    private boolean deleted;

    @OneToOne(mappedBy = "payment")
    private Reservation reservation;

    public void setReservation(Reservation reservation) { // TODO : payment 완성되면 주석 해제
        this.reservation = reservation;
        if (reservation.getPayment() != this) {
            reservation.setPayment(this);
        }
    }

//    public enum PaymentStatus { // TODO : 보류
//        PAYMENT_PENDING(1, "Pending"),
//        PAYMENT_PAID(2, "Paid"),
//        PAYMENT_CANCELLED(3, "Cancelled");
//
//        @Getter
//        private int stepNumber;
//
//        @Getter
//        private String stepDescription;
//
//        PaymentStatus(int stepNumber, String stepDescription) {
//            this.stepNumber = stepNumber;
//            this.stepDescription = stepDescription;
//        }
//    }
}

