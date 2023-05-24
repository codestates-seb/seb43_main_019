package com.osdoor.aircamp.payment.controller;

import com.osdoor.aircamp.exception.BusinessLogicException;
import com.osdoor.aircamp.exception.ExceptionCode;
import com.osdoor.aircamp.payment.service.PaymentService;
import com.osdoor.aircamp.payment.dto.KakaoApproveResponse;
import com.osdoor.aircamp.payment.dto.KakaoCancelResponse;
import com.osdoor.aircamp.reservation.entity.Reservation;
import com.osdoor.aircamp.reservation.service.ReservationService;
import com.osdoor.aircamp.reservation.dto.ReservationPatchDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/payments")
@RequiredArgsConstructor
public class PaymentController {
    private final PaymentService paymentService;
    private final ReservationService reservationService;

    // 결제 요청
    @PostMapping("/ready")
    public ResponseEntity readyToKakaoPay(@RequestParam("reservation_id") long reservationId){
        Reservation reservation = reservationService.verifyPaymentStatus(reservationId);
        return ResponseEntity.ok(paymentService.kakaoPayReady(reservationId, reservation.getActualPaymentAmount()));
    }

    // 결제 승인 요청
    @GetMapping(value = "/approve")
    public ResponseEntity approve(@RequestParam(value = "pg_token") String pgToken,
                                  @RequestParam(value = "tid") String tid) {
        return new ResponseEntity<>(paymentService.approveResponse(pgToken, tid), HttpStatus.MOVED_PERMANENTLY);
    }

    // 결제 성공
    @GetMapping("/success")
    public ResponseEntity success(@RequestParam(value = "tid") String tid) {
        paymentService.completePayment(tid);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    // 결제 진행 중 취소
    @GetMapping("/cancel")
    public void cancel() {
        throw new BusinessLogicException(ExceptionCode.PAY_CANCEL);
    }

    // 결제 실패
    @GetMapping("/fail")
    public void fail() {
        throw new BusinessLogicException(ExceptionCode.PAY_FAILED);
    }
}

