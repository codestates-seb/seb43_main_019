package com.osdoor.aircamp.review.entity;

import com.osdoor.aircamp.audit.Auditable;
import com.osdoor.aircamp.member.entity.Member;
import com.osdoor.aircamp.product.entity.Product;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Entity
@NoArgsConstructor
public class Review extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long reviewId;

    @Column(nullable = false)
    private String content;

    @Column(nullable = false)
    private double score;

    @ManyToOne
    @JoinColumn(name = "PRODUCT_ID")
    private Product product;

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

}
