package com.osdoor.aircamp.payment.service;

import com.osdoor.aircamp.payment.dto.KakaoApproveResponse;
import com.osdoor.aircamp.payment.dto.KakaoReadyResponse;
import com.osdoor.aircamp.payment.entity.Payment;
import com.osdoor.aircamp.payment.repository.PaymentRepository;
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
    @Value("TC0ONETIME") // 테스트용 임시 가맹점 코드
    private String cid;

    @Value("5354945e7fb218d6086a2afb5225250c") // 임시 어드민 키
    private String admin_key;

    @Value("https://kapi.kakao.com/v1/payment")
    private String host;

    @Value("http://aircamp-codestates-019.s3-website.ap-northeast-2.amazonaws.com")
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
