package com.osdoor.aircamp.reservation.controller;

import com.osdoor.aircamp.dto.SingleResponseDto;
import com.osdoor.aircamp.member.service.MemberService;
import com.osdoor.aircamp.reservation.dto.ReservationDto;
import com.osdoor.aircamp.reservation.dto.ReservationPatchDto;
import com.osdoor.aircamp.reservation.dto.ReservationPostDto;
import com.osdoor.aircamp.reservation.dto.ReservationIdResponseDto;
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
@RequestMapping("/api/reservations")
@Validated
public class ReservationController {
    private final static String RESERVATION_DEFAULT_URL = "/api/reservations";
    private final ReservationService reservationService;
    private final ReservationMapper mapper;
    private final MemberService memberService;

    public ReservationController(ReservationService reservationService,
                                 ReservationMapper mapper, MemberService memberService) {
        this.reservationService = reservationService;
        this.mapper = mapper;
        this.memberService = memberService;
    }

    // 새로운 예약을 등록
    @PostMapping
    public ResponseEntity<Object> postReservation(@RequestBody ReservationPostDto reservationPostDto) {
        if (reservationService.isDuplicateReservation(reservationPostDto)) {
            return new ResponseEntity<>("해당 날짜에 이미 진행중이거나 완료된 예약이 존재합니다.", HttpStatus.BAD_REQUEST);
        }
        Reservation reservation = reservationService.createReservation(reservationPostDto);
        return new ResponseEntity<>(reservation, HttpStatus.CREATED);
    }

    // 예약을 수정
    @PatchMapping("{reservation-id}")
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
    @GetMapping("{reservation-id}")
    public ResponseEntity getReservation(@PathVariable("reservation-id") @Positive long reservationId) {
        Reservation reservation = reservationService.findReservation(reservationId);

        return new ResponseEntity<>(
                new SingleResponseDto<>(mapper.reservationToReservationResponseDto(reservation)),
                HttpStatus.OK);
    }

    // 해당 회원이 예약한 내역 조회
    @GetMapping("/member/{memberId}")
    public ResponseEntity<List<ReservationDto>> getReservationsByMemberId(@PathVariable Long memberId) {
        List<ReservationDto> reservations = reservationService.getReservationsByMemberId(memberId);
        return ResponseEntity.ok(reservations);
    }

    // 예약 취소 요청
    @DeleteMapping("{reservation-id}")
    public ResponseEntity cancelReservation(@PathVariable("reservation-id") @Positive long reservationId) {
        reservationService.cancelReservation(reservationId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}

