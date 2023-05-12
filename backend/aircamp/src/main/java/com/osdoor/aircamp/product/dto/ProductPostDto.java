package com.osdoor.aircamp.product.dto;

import com.osdoor.aircamp.member.entity.Member;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class ProductPostDto {

    private String productName;
    private String address;
    private String location;
    private String content;
    private Integer capacity;
    private LocalDateTime cancellationDeadline;
    private Integer productPrice;
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
