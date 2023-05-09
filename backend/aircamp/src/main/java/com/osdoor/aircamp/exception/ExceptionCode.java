package com.osdoor.aircamp.exception;

import lombok.Getter;

public enum ExceptionCode {
    MEMBER_NOT_FOUND(404, "회원을 찾을 수 없습니다."),
    REVIEW_NOT_FOUND(404,"리뷰를 찾을 수 없습니다."),
    PRODUCT_NOT_FOUND(404, "상품을 찾을 수 없습니다."),
    RESERVATION_NOT_FOUND(404, "예약을 찾을 수 없습니다."),
    MEMBER_EXISTS(409, "회원이 존재합니다."),
    PRODUCT_CODE_EXISTS(409, "상품 코드가 존재합니다."),
    CANNOT_CANCEL_RESERVATION(403, "이미 취소된 예약입니다."),
    NOT_IMPLEMENTATION(501, "해당 기능을 수행할 수 없거나 아직 구현되지 않았습니다."),
    INVALID_MEMBER_STATUS(400, "유효하지 않은 회원 상태입니다."),
    MEMBER_NOT_VALID(403,"유효하지 않은 회원입니다.");

    @Getter
    private int status;

    @Getter
    private String message;

    ExceptionCode(int code, String message) {
        this.status = code;
        this.message = message;
    }
}


