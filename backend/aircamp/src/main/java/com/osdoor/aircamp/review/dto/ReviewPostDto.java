package com.osdoor.aircamp.review.dto;

import com.osdoor.aircamp.member.entity.Member;
import com.osdoor.aircamp.product.entity.Product;
import com.osdoor.aircamp.common.validator.NotSpace;
import com.osdoor.aircamp.common.validator.ReviewScore;
import lombok.AllArgsConstructor;
import lombok.Getter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Positive;

@Getter
@AllArgsConstructor
public class ReviewPostDto {
    @NotBlank(message = "리뷰의 내용을 반드시 작성해야합니다.")
    @NotSpace
    private String content;

    @ReviewScore
    private Double score;

    @Positive
    private Long memberId;

    @Positive
    private Long productId;

    public Member getMember() {
        Member member = new Member();
        member.setMemberId(memberId);
        return member;
    }
    public Product getProduct() {
        Product product = new Product();
        product.setProductId(productId);
        return product;
    }
}
