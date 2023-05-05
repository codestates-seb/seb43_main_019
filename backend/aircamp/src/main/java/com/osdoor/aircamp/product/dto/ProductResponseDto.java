package com.osdoor.aircamp.product.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class ProductResponseDto {

    private Long id;
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
    private Boolean deleted;
    private LocalDateTime createdAt;
    private String createdBy;
    private LocalDateTime modifiedAt;
    private String modifiedBy;
    private String imageUrl;
    private Long memberId;

//    public void setMember(Member member) { TODO
//        this.memberId = member.getId();
//    }
}
