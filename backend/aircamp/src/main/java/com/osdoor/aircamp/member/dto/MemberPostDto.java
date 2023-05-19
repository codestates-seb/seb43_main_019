package com.osdoor.aircamp.member.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import javax.validation.constraints.*;
import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class MemberPostDto {
    @NotBlank(message = "username 입력은 필수입니다.")
    private String name; //(수정가능 : 개명)
    @NotBlank(message = "email 입력은 필수입니다.")
    @Pattern(regexp = "\\w+@\\w+\\.\\w+(\\.\\w+)?") // 가능유형 : aa11@aa11.aa11 또는 aa11@aa11.aa11.aa11
    private String email; //(수정불가)
    @NotBlank(message = "생년월일 입력은 필수입니다.")
    @Pattern(regexp = "^\\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2]\\d|3[0-1])$",
            message = "생년월일은 yyyy-mm-dd 형식만 가능합니다.")
    private String birthDate;  //(수정불가)
    @NotBlank(message = "password 입력은 필수입니다.")
    @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$",
    message = "비밀번호는 최소 8자 이상의 길이를 가져야 하며, 최소 하나의 대문자, 소문자, 숫자, 특수문자(@ , $ , ! , % , * , ? , &)를 포함")
    private String password; //(수정가능)
    @NotBlank(message = "휴대전화 번호 입력은 필수입니다.")
    @Pattern(regexp = "^01(?:0|1|[6-9])-(?:\\d{3}|\\d{4})-\\d{4}$",
            message = "가능한 휴대폰 번호 유형은, [ 01? - 3자리 or 4자리 - 4자리 ] 만 가능합니다.") // 가능유형 : 앞자리=010,011,016~019 , 중간자리=3자리숫자or4자리숫자 , 마지막자리=4자리숫자
    private String phone;  //(수정가능)
    @AssertTrue(message = "본인인증의 결과는 반드시 true 이어야 합니다.")
    private boolean isEmailVerified;

    private boolean isSellerVerified;
    @Pattern(regexp = "^\\d{3}-\\d{2}-\\d{5}$",
    message = "올바른 형식의 사업자등록번호를 입력해주세요. 333-22-55555 형식만 가능합니다.")
    private String businessRegistrationNumber;

    @Pattern(regexp = "^\\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2]\\d|3[0-1])$",
            message = "사업자등록일자는 yyyy-mm-dd 형식만 가능합니다.")
    private String businessRegistrationDate;
}
