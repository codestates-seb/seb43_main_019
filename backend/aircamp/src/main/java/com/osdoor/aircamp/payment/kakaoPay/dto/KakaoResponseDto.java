package com.osdoor.aircamp.payment.kakaoPay.dto;

import lombok.Getter;

import java.time.ZoneId;
import java.time.ZonedDateTime;

public class KakaoResponseDto {

    @Getter
    public static class Request{
        private String tid;
        private String next_redirect_pc_url;
        private ZonedDateTime create_at = ZonedDateTime.now(ZoneId.of("Asia/Seoul"));

    }
    @Getter
    public static class Approve{
        private String aid;
        private String tid;
        private String cid;
        private String sid;
        private String partner_order_id;
        private String partner_user_id;
        private String payment_method_type;
        private String item_name;
        private String item_code;
        private String created_at;
        private String approved_at;
        private String payload;
        private Amount amount;
        private int quantity;

        @Getter
        private class Amount {
            private int total;
            private int tax_free;
            private int vat;
            private int discount;
        }

    }
}
