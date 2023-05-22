package com.osdoor.aircamp.payment.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class KakaoApproveResponse {
    private String aid; // 요청 고유 번호
    private String tid; // 결제 고유 번호
    private String cid; // 가맹점 코드
    private String sid; // 정기결제용 ID
    private String partner_order_id; // 가맹점 주문 번호
    private String partner_user_id; // 가맹점 회원 id
    private String payment_method_type; // 결제 수단
    private Amount amount; // 결제 금액 정보
    private String item_name; // 상품명
    private String item_code; // 상품 코드
    private int quantity; // 상품 수량
    private String created_at; // 결제 요청 시간
    private String approved_at; // 결제 승인 시간
    private String payload; // 결제 승인 요청에 대해 저장 값, 요청 시 전달 내용

    @Builder
    public KakaoApproveResponse(String aid,
                                String tid,
                                String cid,
                                String sid,
                                String partner_order_id,
                                String partner_user_id,
                                String payment_method_type,
                                Amount amount,
                                String item_name,
                                String item_code,
                                int quantity,
                                String created_at,
                                String approved_at,
                                String payload) {
        this.aid = aid;
        this.tid = tid;
        this.cid = cid;
        this.sid = sid;
        this.partner_order_id = partner_order_id;
        this.partner_user_id = partner_user_id;
        this.payment_method_type = payment_method_type;
        this.amount = amount;
        this.item_name = item_name;
        this.item_code = item_code;
        this.quantity = quantity;
        this.created_at = created_at;
        this.approved_at = approved_at;
        this.payload = payload;
    }
}