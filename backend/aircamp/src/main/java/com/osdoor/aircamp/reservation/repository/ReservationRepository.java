package com.osdoor.aircamp.reservation.repository;

import com.osdoor.aircamp.reservation.entity.Reservation;
import com.osdoor.aircamp.reservation.entity.ReservationStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    // 새로운 예약을 등록할 때, 중복 예약임을 판별하는 메서드
    Optional<Reservation> findByProductProductIdAndReservationDateAndReservationStatusIn(
            Long productId, LocalDate reservationDate, List<ReservationStatus> reservationStatuses);

    // 특정 productID와 예약 날짜에 해당하는 예약을 찾는 메서드 v1
    Optional<Reservation> findReservationByProductProductIdAndReservationDate(Long productId, LocalDate reservationDate);

    // 특정 productID와 예약 날짜에 해당하는 예약을 찾는 메서드 v2
//    Optional<Reservation> findByProductIdAndReservationDateAndReservationStatusIn(Long productId, LocalDate reservationDate, List<ReservationStatus> statusList);
}

