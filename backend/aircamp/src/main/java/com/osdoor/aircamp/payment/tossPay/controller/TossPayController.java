package com.osdoor.aircamp.payment.tossPay.controller;

import com.osdoor.aircamp.payment.tossPay.service.TossPayService;
import com.osdoor.aircamp.reservation.service.ReservationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RequestMapping("/payments")
@RestController
public class TossPayController {

    private final TossPayService tossPayService;
    private final ReservationService reservationService;

    @GetMapping("/toss/approve")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public String tossApprove(
            @RequestParam("paymentKey") String paymentKey,
            @RequestParam("amount") int amount,
            @RequestParam(name = "reservationId") String reservationId
    ) {
        String approve = tossPayService.approve(paymentKey, reservationId, amount);
        reservationId = reservationId.replace("abcdef", "");
        reservationService.completeReservation(Long.parseLong(reservationId));

        return approve;
    }
}
