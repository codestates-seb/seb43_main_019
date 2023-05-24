package com.osdoor.aircamp.reservation.repository;

import com.osdoor.aircamp.reservation.entity.Reservation;
import com.osdoor.aircamp.reservation.entity.ReservationStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    // 새로운 예약을 등록할 때, 중복 예약임을 판별하는 메서드
    Optional<Reservation> findByProductIdAndReservationDateAndReservationStatusIn(
            Long productId, LocalDate reservationDate, List<ReservationStatus> reservationStatuses);
}

