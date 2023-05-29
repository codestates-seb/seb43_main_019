package com.osdoor.aircamp.member.dto;

import com.osdoor.aircamp.validator.NotSpace;
import lombok.AllArgsConstructor;
import lombok.Getter;

import javax.validation.constraints.Pattern;

@Getter
@AllArgsConstructor
public class MemberPatchDto {
    private long memberId;

    @NotSpace(message = "회원의 이름은 공백이 아니어야 합니다.")
    private String name;

    @NotSpace(message = "비밀번호는 공백이 아니어야 합니다.")
    @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$",
            message = "비밀번호는 최소 8자 이상의 길이를 가져야 하며, 최소 하나의 대문자, 소문자, 숫자, 특수문자(@ , $ , ! , % , * , ? , &)를 포함")
    private String password;

    @NotSpace(message = "전화번호는 공백이 아니어야 합니다.")
    @Pattern(regexp = "^01(?:0|1|[6-9])-(?:\\d{3}|\\d{4})-\\d{4}$",
            message = "가능한 휴대폰 번호 유형은, [ 01? - 3자리 or 4자리 - 4자리 ] 만 가능합니다.") // 가능유형 : 앞자리=010,011,016~019 , 중간자리=3자리숫자or4자리숫자 , 마지막자리=4자리숫자
    private String phone;

    private boolean isSellerVerified;
    @Pattern(regexp = "^\\d{3}-\\d{2}-\\d{5}$",
            message = "올바른 형식의 사업자등록번호를 입력해주세요. 333-22-55555 형식만 가능합니다.")
    private String businessRegistrationNumber;

    @Pattern(regexp = "^\\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2]\\d|3[0-1])$",
            message = "사업자등록일자는 yyyy-mm-dd 형식만 가능합니다.")
    private String businessRegistrationDate;

    public void setMemberId(long memberId) {
        this.memberId = memberId;
    }
}
