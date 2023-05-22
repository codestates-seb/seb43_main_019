package com.osdoor.aircamp.product.dto;

import com.osdoor.aircamp.member.entity.Member;
import lombok.Getter;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Positive;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
public class ProductPostDto {

    @NotBlank(message = "상품명을 입력해주세요.")
    private String productName;

    @NotBlank(message = "주소를 입력해주세요.")
    private String address;

    @NotBlank(message = "지역을 입력해주세요.")
    private String location;

    @NotBlank(message = "상품 설명을 입력해주세요.")
    private String content;

    @NotBlank(message = "허용 인원수를 입력해주세요.")
    @Positive(message = "1 이상 입력해주세요.")
    private Integer capacity;

    private LocalDate cancellationDeadline;

    @NotBlank(message = "가격을 입력해주세요.")
    @Min(value = 1000, message = "1000원 이상 입력해주세요.")
    private Integer productPrice;

    @NotBlank(message = "전화번호를 입력해주세요.")
    @Pattern(regexp = "^0\\d{1,2}-\\d{3,4}-\\d{4}$",
            message = "전화번호를 정확히 입력해주세요.")
    private String productPhone;
    private Double latitude;
    private Double longitude;
    private String createdBy;
    private String modifiedBy;
    private String imageUrl;
    private Long memberId;

    public Member getMember() {
        Member member = new Member();
        member.setMemberId(memberId);
        return member;
    }
}
