package com.osdoor.aircamp.payment.global;

import com.osdoor.aircamp.payment.kakaoPay.dto.PaymentParams;
import com.osdoor.aircamp.reservation.entity.Reservation;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

@Component
public class ParameterProvider {

    private static final String PARTNER_USER_ID = "aircamp"; // 가맹점 회원 id
    private static final String ONE_TIME_APPROVAL_URL = "http://localhost:9090/payments/kakao/approve/";
    private static final String SUBSCRIPTION_APPROVAL_URI = "http://localhost:9090/payments/kakao/subs/approve";
    private static final String CANCEL_URI = "http://localhost:9090/cancel";
    private static final String FAIL_URI = "http://localhost:9090/fail";

    public MultiValueMap<String, String> getOneTimeReqsParams(Reservation reservation) {
        MultiValueMap<String, String> commonReqsParams = getRequestParams(reservation);
        commonReqsParams.add("cid", "TC0ONETIME");
        commonReqsParams.add("approval_url", ONE_TIME_APPROVAL_URL + reservation.getReservationId());

        return commonReqsParams;
    }

    public MultiValueMap<String, String> getSubscriptionReqsParams(Reservation reservation) {
        MultiValueMap<String, String> commonReqsParams = getRequestParams(reservation);
        commonReqsParams.add("cid", "TCSUBSCRIP");
        commonReqsParams.add("approval_url", SUBSCRIPTION_APPROVAL_URI);
        return commonReqsParams;
    }

    public MultiValueMap<String, String> getOneTimeApproveParams(
            String tid,
            String pgToken,
            Long reservationId
    ) {
        MultiValueMap<String, String> commonApproveParams =
                getCommonApproveParams(tid, pgToken, reservationId);
        commonApproveParams.add("cid", "TC0ONETIME");
        return commonApproveParams;
    }

    public MultiValueMap<String, String> getSubscriptionApproveParams(
            String tid,
            String pgToken,
            Long reservationId
    ) {
        MultiValueMap<String, String> commonSubsParams = getCommonApproveParams(tid, pgToken,
                reservationId);
        commonSubsParams.add("cid", "TCSUBSCRIP");
        return commonSubsParams;
    }

    private MultiValueMap<String, String> getRequestParams(Reservation reservation) {
        PaymentParams requestParamsInfo = getRequestParamsInfo(reservation);
        return getCommonReqsParams(requestParamsInfo);
    }

    private MultiValueMap<String, String> getCommonApproveParams(
            String tid,
            String pgToken,
            Long reservationId
    ) {
        MultiValueMap<String, String> parameters = new LinkedMultiValueMap<>();

        parameters.add("tid", tid);
        parameters.add("partner_order_id", String.valueOf(reservationId));
        parameters.add("partner_user_id", PARTNER_USER_ID);
        parameters.add("pg_token", pgToken);

        return parameters;
    }

    private MultiValueMap<String, String> getCommonReqsParams(PaymentParams paymentParams) {
        MultiValueMap<String, String> parameters = new LinkedMultiValueMap<>();

        parameters.add("partner_order_id", String.valueOf(paymentParams.getReservationId()));
        parameters.add("partner_user_id", PARTNER_USER_ID);
        parameters.add("item_name", paymentParams.getItemName());
        parameters.add("quantity", String.valueOf(paymentParams.getQuantity()));
        parameters.add("total_amount", String.valueOf(paymentParams.getTotalAmount()));
        parameters.add("tax_free_amount", "0");
        parameters.add("cancel_url", CANCEL_URI);
        parameters.add("fail_url", FAIL_URI);

        return parameters;
    }

    private PaymentParams getRequestParamsInfo(Reservation reservation) {
//        String itemName = getItemName(reservation);


        return PaymentParams.builder()
//                .totalAmount(reservation.getProductPrice())

//                .itemName(itemName)
                .reservationId(reservation.getReservationId())
                .build();
    }


//    private String getItemName(Reservation reservation) {
//        Integer itemQuantity = reservation.getTotalItems();
//        String itemName = reservation.getItemReservations().get(0).getItem().getTitle();
//
//        if (itemQuantity == 1) {
//            return itemName;
//        }
//        return itemName + " 그 외 " + (itemQuantity - 1);
//    }
}
