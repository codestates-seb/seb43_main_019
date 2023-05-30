package com.osdoor.aircamp.product.dto;

import com.osdoor.aircamp.member.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
public class ProductResponseDto {

    private Long productId;
    private String productName;
    private String address;
    private String location;
    private String content;
    private Integer capacity;
    private LocalDate cancellationDeadline;
    private Integer productPrice;
    private String productPhone;
    private Double latitude;
    private Double longitude;
    private Boolean deleted;
    private LocalDate createdAt;
    private String createdBy;
    private LocalDate modifiedAt;
    private String modifiedBy;
    private String imageUrl;
    private Long memberId;

    public void setMember(Member member) {
        this.memberId = member.getMemberId();
    }
}
