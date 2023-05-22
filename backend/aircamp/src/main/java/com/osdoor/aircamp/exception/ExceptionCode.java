package com.osdoor.aircamp.exception;

import lombok.Getter;

public enum ExceptionCode {
    // global
    NOT_IMPLEMENTATION(501, "해당 기능을 수행할 수 없거나 아직 구현되지 않았습니다."),
    ADDRESS_NOT_FOUND(404, "주소를 찾을 수 없습니다."),

    // member
    INVALID_MEMBER_STATUS(400, "유효하지 않은 회원 상태입니다."),
    MEMBER_NOT_VALID(403,"유효하지 않은 회원입니다."),
    MEMBER_NOT_FOUND(404, "회원을 찾을 수 없습니다."),
    MEMBER_EXISTS(409, "회원이 존재합니다."),

    // review
    REVIEW_NOT_FOUND(404,"리뷰를 찾을 수 없습니다."),

    // product
    PRODUCT_CODE_EXISTS(409, "상품 코드가 존재합니다."),
    PRODUCT_NOT_FOUND(404, "상품을 찾을 수 없습니다."),

    // reservation
    CANNOT_CANCEL_RESERVATION(403, "이미 취소된 예약입니다."),
    RESERVATION_NOT_FOUND(404, "예약을 찾을 수 없습니다."),

    // payment
    PAY_CANCEL(404,"결제가 취소되었습니다"),
    PAY_FAILED(404,"결제가 실패하였습니다"),
    PAYMENT_FAILED(404,"결제실패"),
    CAN_NOT_PAY(400,"결제할 수 없는 상태입니다");

    @Getter
    private int status;

    @Getter
    private String message;

    ExceptionCode(int code, String message) {
        this.status = code;
        this.message = message;
    }
}


