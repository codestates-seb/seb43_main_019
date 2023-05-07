package com.osdoor.aircamp.reservation.entity;

import com.osdoor.aircamp.audit.Auditable;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@NoArgsConstructor
@Getter
@Setter
@Entity(name = "RESERVATIONS")
public class Reservation extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long reservationId;

    @Column(nullable = false)
    private LocalDateTime reservationDate;

    @Column(nullable = false)
    private String reservationName;

    @Column(nullable = false)
    private String reservationPhone;

    @Column(nullable = false)
    private String reservationEmail;

    @Column(nullable = false)
    private boolean deleted;

//    @ManyToOne TODO : 각 파트 개발시 주석 해제 하기
//    @JoinColumn(name = "MEMBER_ID")
//    private Member member;
//
//    @ManyToOne
//    @JoinColumn(name = "PRODUCT_ID")
//    private Product product;
//
//    @OneToOne
//    @JoinColumn(name = "PAYMENT_ID")
//    private Payment payment;
//
//    public void setMember(Member member) {
//        this.member = member;
//    }
//
//    public void setProduct(Product product) {
//        this.product = product;
//    }
//
//    public void setPayment(Payment payment) {
//        this.payment = payment;
//        payment.setReservation(this); // reservation <-> payment 간 양방향 연관관계 설정
//    }
}
