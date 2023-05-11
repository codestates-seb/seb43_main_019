package com.osdoor.aircamp.payment.kakaoPay.service;

import com.osdoor.aircamp.exception.BusinessLogicException;
import com.osdoor.aircamp.exception.ExceptionCode;
import com.osdoor.aircamp.payment.global.PaymentTypeFacade;
import com.osdoor.aircamp.payment.kakaoPay.dto.KakaoResponseDto;
import com.osdoor.aircamp.payment.kakaoPay.dto.KakaoResponseDto.Approve;
import com.osdoor.aircamp.payment.kakaoPay.service.approve.KakaoPayApprove;
import com.osdoor.aircamp.payment.kakaoPay.service.request.KakaoPayRequest;
import com.osdoor.aircamp.reservation.entity.Reservation;
import com.osdoor.aircamp.reservation.repository.ReservationRepository;
import com.osdoor.aircamp.reservation.service.ReservationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.Optional;

@RequiredArgsConstructor
@Component
public class KakaoPaymentFacade implements PaymentTypeFacade {

    private final KakaoPayRequest kakaoPayRequestImpl;
    private final KakaoPayApprove kakaoPayApproveImpl;
    private final ReservationRepository reservationRepository;
    private final RestTemplate restTemplate;
    private final ReservationService reservationService;

    @Override
    public KakaoResponseDto.Request request(long reservationId) {
        Reservation reservation = findReservation(reservationId);
        return kakaoPayRequestImpl.requestOneTime(reservation);
    }

    @Override
    public KakaoResponseDto.Approve approve(String tid, String pgToken, Long reservationId) {
        Reservation reservation = findReservation(reservationId);
        Approve approve = kakaoPayApproveImpl.approveOneTime(tid, pgToken, reservationId);
        reservationService.completeReservation(reservationId);
        return approve;
    }

    private void doKakaoScheduling(Long reservationId) {

        MultiValueMap<String, String> queryParam = new LinkedMultiValueMap<>();

        queryParam.add("reservationId", String.valueOf(reservationId));

        URI uri = UriComponentsBuilder.newInstance().scheme("http").host("localhost").port(9090)
                .path("/schedule/kakao")
                .queryParams(queryParam).build().toUri();

        restTemplate.getForObject(uri, String.class);
    }

    private Reservation findReservation(Long reservationId) {
        Optional<Reservation> orderOptional = reservationRepository.findById(reservationId);
        return orderOptional.orElseThrow(
                () -> new BusinessLogicException(ExceptionCode.RESERVATION_NOT_FOUND)
        );
    }
}
