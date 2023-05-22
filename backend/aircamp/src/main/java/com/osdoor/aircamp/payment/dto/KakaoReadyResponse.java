package com.osdoor.aircamp.payment.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class KakaoReadyResponse {
    private String tid;
    private String next_redirect_pc_url;  //pc웹 결제 페이지
    private String created_at;
}
