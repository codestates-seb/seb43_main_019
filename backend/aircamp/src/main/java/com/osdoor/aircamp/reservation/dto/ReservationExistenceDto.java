package com.osdoor.aircamp.reservation.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class ReservationExistenceDto {
    private Long productId;
    private LocalDate reservationDate;
    private boolean existence;
}