package com.osdoor.aircamp.payment.service;

import com.osdoor.aircamp.payment.dto.KakaoApproveResponse;
import com.osdoor.aircamp.payment.dto.KakaoReadyResponse;
import com.osdoor.aircamp.payment.entity.Payment;
import com.osdoor.aircamp.payment.repository.PaymentRepository;
import com.osdoor.aircamp.reservation.entity.PaymentStatus;
import com.osdoor.aircamp.reservation.entity.Reservation;
import com.osdoor.aircamp.reservation.repository.ReservationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

@Service
@RequiredArgsConstructor
@Transactional
public class PaymentService {
    @Value("${kakaoPay.cid}") // 테스트용 임시 가맹점 코드
    private String cid;

    @Value("${kakaoPay.adminKey}") // 임시 어드민 키
    private String admin_key;

    @Value("${kakaoPay.host}")
    private String host;

    @Value("${customPath.redirectUrl}")
    private String redirectUrl;

    private KakaoReadyResponse kakaoReady;

    private final PaymentRepository paymentRepository;

    private final ReservationRepository reservationRepository;

    // 결제요청
    public KakaoReadyResponse kakaoPayReady(long reservationId, int actual_payment_amount){
        MultiValueMap<String, Object> parameters = new LinkedMultiValueMap<>();
        parameters.add("cid", cid);
        parameters.add("partner_order_id", reservationId);
        parameters.add("partner_user_id", "가맹점 회원 ID");
        parameters.add("item_name", "상품명");
        parameters.add("quantity", 1);
        parameters.add("total_amount", actual_payment_amount);
        parameters.add("vat_amount", 0);
        parameters.add("tax_free_amount", 0);
        parameters.add("approval_url", redirectUrl + "/api/payments/success?reservation_id=" + reservationId); // 성공 시 redirect url
        parameters.add("cancel_url", redirectUrl + "/api/payments/cancel"); // 취소 시 redirect url
        parameters.add("fail_url", redirectUrl + "/api/payments/fail"); // 실패 시 redirect url

        // 파라미터, 헤더
        HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(parameters, this.getHeaders());

        // 외부에 보낼 url
        RestTemplate restTemplate = new RestTemplate();

        kakaoReady = restTemplate.postForObject(
                host+"/ready", // post 요청 url
                requestEntity,
                KakaoReadyResponse.class);

        // 새로운 Payment 객체를 생성하고 저장
        Reservation reservation = reservationRepository.findById(reservationId).orElse(null);
        if (reservation != null) {
            Payment payment = new Payment();
            payment.setTid(kakaoReady.getTid());  // TID 설정
            payment.setReservation(reservation);  // 예약 정보 설정
            payment.setPaymentStatus(PaymentStatus.NOT_PAYMENT);  // 결제 상태 설정 (아직 완료되지 않았으므로)
            paymentRepository.save(payment);  // 데이터베이스에 저장
        }

        return kakaoReady;
    }

    // 결제 완료 승인
    public KakaoApproveResponse approveResponse(String pgToken, String tid) {
        // 카카오 요청
        MultiValueMap<String, Object> parameters = new LinkedMultiValueMap<>();
        parameters.add("cid", cid);
        parameters.add("tid", tid);
        parameters.add("partner_order_id", "reservationId");
        parameters.add("partner_user_id", "가맹점 회원 ID");
        parameters.add("pg_token", pgToken);

        // 파라미터, 헤더
        HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(parameters, this.getHeaders());
        // 외부에 보낼 url
        RestTemplate restTemplate = new RestTemplate();
        KakaoApproveResponse approveResponse = restTemplate.postForObject(
                host+"/approve",
                requestEntity,
                KakaoApproveResponse.class);

        // Payment 를 찾고, 결제 완료 상태를 저장
        Payment payment = paymentRepository.findByReservation(tid).orElse(null);
        if (payment != null) {
            Reservation reservation = payment.getReservation();

            // 결제 완료 상태를 저장
            payment.setPaymentStatus(PaymentStatus.COMPLETED);
            paymentRepository.save(payment);

            // Reservation 에도 결제 정보를 업데이트
            reservation.setPayment(payment);
            reservationRepository.save(reservation);
        }

        return approveResponse;
    }

    // 카카오에서 요구하는 헤더값 생성 메소드
    private HttpHeaders getHeaders() {
        HttpHeaders headers = new HttpHeaders();

        String auth = "KakaoAK " + admin_key;

        headers.set("Authorization", auth);
        headers.set("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        return headers;
    }

    public Payment completePayment(String tid) {
        Payment payment = getPayment(tid);
        return paymentRepository.save(payment);
    }

    private Payment getPayment(String tid) {
        return paymentRepository.findByReservation(tid).orElse(null);
    }
}
