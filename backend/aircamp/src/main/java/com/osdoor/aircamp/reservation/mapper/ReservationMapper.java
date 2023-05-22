package com.osdoor.aircamp.reservation.mapper;

import com.osdoor.aircamp.reservation.dto.ReservationPatchDto;
import com.osdoor.aircamp.reservation.dto.ReservationPostDto;
import com.osdoor.aircamp.reservation.dto.ReservationResponseDto;
import com.osdoor.aircamp.reservation.entity.Reservation;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ReservationMapper {
    Reservation reservationPatchDtoToReservation(ReservationPatchDto reservationPatchDto);
    List<ReservationResponseDto> reservationsToReservationResponseDtos(List<Reservation> reservations);
    
    Reservation reservationPostDtoToReservation(ReservationPostDto reservationPostDto);

    default ReservationResponseDto reservationToReservationResponseDto(Reservation reservation){
        ReservationResponseDto reservationResponseDto = new ReservationResponseDto();

        reservationResponseDto.setReservationId(reservation.getReservationId());
        reservationResponseDto.setReservationDate(reservation.getReservationDate());
        reservationResponseDto.setMember(reservation.getMember());
        reservationResponseDto.setReservationStatus(reservation.getReservationStatus());
        reservationResponseDto.setCreatedAt(reservation.getCreatedAt());
        reservationResponseDto.setCreatedBy(reservation.getCreatedBy());

        return reservationResponseDto;
    }
}

