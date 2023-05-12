package com.osdoor.aircamp.reservation.controller;

import com.osdoor.aircamp.dto.SingleResponseDto;
import com.osdoor.aircamp.member.service.MemberService;
import com.osdoor.aircamp.reservation.dto.ReservationPatchDto;
import com.osdoor.aircamp.reservation.dto.ReservationPostDto;
import com.osdoor.aircamp.reservation.entity.Reservation;
import com.osdoor.aircamp.reservation.mapper.ReservationMapper;
import com.osdoor.aircamp.reservation.service.ReservationService;
import com.osdoor.aircamp.utils.UriCreator;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/reservations") // 클래스에 대한 HTTP 요청 매핑을 정의하기 위한 애너테이션
@Validated // 입력값 검증 위한 애너테이션
public class ReservationController {
    private final static String RESERVATION_DEFAULT_URL = "/api/reservations";
    private final ReservationService reservationService;
    private final ReservationMapper mapper;
    private final MemberService memberService; // MemberService 구현되면 주석 해제

    public ReservationController(ReservationService reservationService,
                                 ReservationMapper mapper, MemberService memberService) {
        this.reservationService = reservationService;
        this.mapper = mapper;
        this.memberService = memberService;
    }

    // 새로운 예약을 등록
    @PostMapping
    public ResponseEntity postReservation(@Valid @RequestBody ReservationPostDto reservationPostDto) {
        Reservation reservation = reservationService.createReservation(mapper.reservationPostDtoToReservation(reservationPostDto));
        URI location = UriCreator.createUri(RESERVATION_DEFAULT_URL, reservation.getReservationId());

        return ResponseEntity.created(location).build();
    }

    // 예약을 수정
    @PatchMapping("/{reservation-id}")
    public ResponseEntity patchReservation(@PathVariable("reservation-id") @Positive long reservationId,
                                           @Valid @RequestBody ReservationPatchDto reservationPatchDto) {
        reservationPatchDto.setReservationId(reservationId);
        Reservation reservation =
                reservationService.updateReservation(mapper.reservationPatchDtoToReservation(reservationPatchDto));

        return new ResponseEntity<>(
                new SingleResponseDto<>(mapper.reservationToReservationResponseDto(reservation))
                , HttpStatus.OK);
    }

    // 예약을 조회
    @GetMapping("/{reservation-id}")
    public ResponseEntity getReservation(@PathVariable("reservation-id") @Positive long reservationId) {
        Reservation reservation = reservationService.findReservation(reservationId);

        return new ResponseEntity<>(
                new SingleResponseDto<>(mapper.reservationToReservationResponseDto(reservation)),
                HttpStatus.OK);
    }

    // 예약 취소 요청
    @DeleteMapping("/{reservation-id}")
    public ResponseEntity cancelReservation(@PathVariable("reservation-id") @Positive long reservationId) {
        reservationService.cancelReservation(reservationId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}

