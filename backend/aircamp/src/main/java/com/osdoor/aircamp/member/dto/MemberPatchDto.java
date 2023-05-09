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
    @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$\n",
            message = "비밀번호는 최소 8자 이상의 길이를 가져야 하며, 최소 하나의 대문자, 소문자, 숫자, 특수문자(@ , $ , ! , % , * , ? , &)를 포함")
    private String password;

    @NotSpace(message = "전화번호는 공백이 아니어야 합니다.")
    @Pattern(regexp = "^01(?:0|1|[6-9])-(?:\\d{3}|\\d{4})-\\d{4}$",
            message = "가능한 휴대폰 번호 유형은, [ 01? - 3자리 or 4자리 - 4자리 ] 만 가능합니다.") // 가능유형 : 앞자리=010,011,016~019 , 중간자리=3자리숫자or4자리숫자 , 마지막자리=4자리숫자
    private String phone;

    public void setMemberId(long memberId) {
        this.memberId = memberId;
    }
}
