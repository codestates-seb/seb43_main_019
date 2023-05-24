package com.osdoor.aircamp.payment.repository;

import com.osdoor.aircamp.payment.entity.Payment;
import com.osdoor.aircamp.reservation.entity.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface PaymentRepository extends JpaRepository<Payment, Long> {
    // Tid 값으로 payment 객체를 찾는 메서드
    Optional<Payment> findByTid(String tid);
}
