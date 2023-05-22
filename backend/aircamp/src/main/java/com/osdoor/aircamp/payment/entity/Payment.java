package com.osdoor.aircamp.payment.entity;

import com.osdoor.aircamp.audit.Auditable;
import com.osdoor.aircamp.reservation.entity.Reservation;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Payment extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long paymentId;

    @OneToOne
    @JoinColumn(name = "reservation_id")
    private Reservation reservation;

    private String tid;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Reservation.PaymentStatus paymentStatus = Reservation.PaymentStatus.COMPLETED;

}
