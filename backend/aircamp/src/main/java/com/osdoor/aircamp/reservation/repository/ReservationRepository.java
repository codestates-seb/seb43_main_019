package com.osdoor.aircamp.reservation.repository;

import com.osdoor.aircamp.reservation.entity.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {
}
