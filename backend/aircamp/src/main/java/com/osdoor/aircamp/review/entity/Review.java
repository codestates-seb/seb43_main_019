package com.osdoor.aircamp.review.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.osdoor.aircamp.common.audit.Auditable;
import com.osdoor.aircamp.member.entity.Member;
import com.osdoor.aircamp.product.entity.Product;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.security.core.context.SecurityContextHolder;

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

    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "PRODUCT_ID")
    private Product product;

    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    @PrePersist //앤티티가 생성되기전에 onCreate가 호출(초기화)를 해준다.
    private void onCreate() {
        this.createdBy = SecurityContextHolder.getContext().getAuthentication().getName();
    }

    @PreUpdate  //앤티티가 수정되기전에 onUpdate가 호출(초기화)된다.
    private void onUpdate() {
        this.modifiedBy = SecurityContextHolder.getContext().getAuthentication().getName();
    }
}
