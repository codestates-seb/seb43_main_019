package com.osdoor.aircamp.payment.repository;

import com.osdoor.aircamp.payment.entity.Payment;
import com.osdoor.aircamp.reservation.entity.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface PaymentRepository extends JpaRepository<Payment, Long> {
    @Query("select c from Payment c " +
            "left join fetch c.reservation " +
            "where c.tid =:tid")
    Optional<Payment> findByReservation(String tid);
}
