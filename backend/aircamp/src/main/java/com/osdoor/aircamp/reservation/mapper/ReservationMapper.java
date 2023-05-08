package com.osdoor.aircamp.reservation.mapper;

import com.osdoor.aircamp.reservation.dto.ReservationPatchDto;
import com.osdoor.aircamp.reservation.dto.ReservationPostDto;
import com.osdoor.aircamp.reservation.dto.ReservationResponseDto;
import com.osdoor.aircamp.reservation.entity.Reservation;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ReservationMapper {
    Reservation reservationPostDtoToReservation(ReservationPostDto reservationPostDto);
    Reservation reservationPatchDtoToReservation(ReservationPatchDto reservationPatchDto);
    ReservationResponseDto reservationToReservationResponseDto(Reservation reservation);
}
