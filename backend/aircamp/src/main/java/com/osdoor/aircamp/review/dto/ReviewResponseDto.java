package com.osdoor.aircamp.review.dto;

import com.osdoor.aircamp.member.entity.Member;
import com.osdoor.aircamp.product.entity.Product;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class ReviewResponseDto {
    private long reviewId;
    private String content;
    private double score;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;
    private String createdBy;
    private String modifiedBy;
    private long memberId;
    private long productId;
    public void setMember(Member member) {
        this.memberId = member.getMemberId();
    }
    public void setProduct(Product product) {
        this.productId = product.getProductId();
    }

}
