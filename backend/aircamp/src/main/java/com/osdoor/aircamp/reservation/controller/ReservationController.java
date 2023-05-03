package com.osdoor.aircamp.reservation.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.net.URI;

@RestController
@RequestMapping("/reservations") // 클래스에 대한 HTTP 요청 매핑을 정의하기 위한 애너테이션
@Validated // 입력값 검증 위한 애너테이션
public class ReservationController {
    private final static String RESERVATION_DEFAULT_URL = "/reservations";
//    private final static ReservationService reservationService; // ReservationService 구현되면 주석 해제
//    private final ReservationMapper mapper; // ReservationMapper 구현되면 주석 해제
//    private final MemberService memberService; // MemberService 구현되면 주석 해제

    /** ReservationService, ReservationMapper, MemberService 구현되면 주석 해제 */
//    public ReservationController(ReservationService reservationService,
//                                 ReservationMapper mapper, MemberService memberService) {
//        this.reservationService = reservationService;
//        this.mapper = mapper;
//        this.memberService = memberService;
//    }

    /** ReservationPostDto, Reservation 엔티티, ReservationService 구현되면 주석 해제 */
    // 새로운 예약을 등록하는 메서드
//    @PostMapping
//    public ResponseEntity postReservation(@Valid @RequestBody ReservationPostDto reservationPostDto) {
//        Reservation reservation = reservationService.createReservation(mapper.reservationPostDtoToReservation(reservationPostDto));
//        URI location = UriCreator.createUri(RESERVATION_DEFAULT_URL, reservation.getReservationId());
//
//        return ResponseEntity.created(location).build();
//    }

}
