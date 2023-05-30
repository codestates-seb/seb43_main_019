package com.osdoor.aircamp.reservation.mapper;

import com.osdoor.aircamp.reservation.dto.ReservationPatchDto;
import com.osdoor.aircamp.reservation.dto.ReservationPostDto;
import com.osdoor.aircamp.reservation.dto.ReservationResponseDto;
import com.osdoor.aircamp.reservation.entity.Reservation;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ReservationMapper {
    @Mapping(target = "member", ignore = true)
    @Mapping(target = "product", ignore = true)
    @Mapping(target = "version", ignore = true)
    @Mapping(target = "payment", ignore = true)
    Reservation reservationPatchDtoToReservation(ReservationPatchDto reservationPatchDto);
    List<ReservationResponseDto> reservationsToReservationResponseDtos(List<Reservation> reservations);

    @Mapping(target = "reservationStatus", ignore = true)
    @Mapping(target = "reservationId", ignore = true)
    @Mapping(target = "paymentDate", ignore = true)
    @Mapping(target = "paymentStatus", ignore = true)
    @Mapping(target = "deleted", ignore = true)
    @Mapping(target = "version", ignore = true)
    @Mapping(target = "payment", ignore = true)
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

