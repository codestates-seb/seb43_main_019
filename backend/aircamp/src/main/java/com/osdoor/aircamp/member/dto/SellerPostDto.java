package com.osdoor.aircamp.member.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

@Getter
@AllArgsConstructor
public class SellerPostDto {
    private long memberId;
    @NotBlank(message = "사업자 등록 번호를 입력하세요")
    @Pattern(regexp = "^\\d{3}-\\d{2}-\\d{5}$",
            message = "올바른 형식의 사업자등록번호를 입력해주세요. 333-22-55555 형식만 가능합니다.")
    private String businessRegistrationNumber;
    @NotBlank(message = "사업자등록번호 등록일자를 입력하세요")
    @Pattern(regexp = "^\\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2]\\d|3[0-1])$",
            message = "사업자등록일자는 yyyy-mm-dd 형식만 가능합니다.")
    private String businessRegistrationDate;

    public void setMemberId(long memberId) {
        this.memberId = memberId;
    }
}
