package com.osdoor.aircamp.product.entity;

import com.osdoor.aircamp.audit.Auditable;
import com.osdoor.aircamp.member.entity.Favorite;
import com.osdoor.aircamp.member.entity.Member;
import com.osdoor.aircamp.review.entity.Review;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Product extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long productId;

    @Column(nullable = false, unique = true)
    private String productName;

    @Column(nullable = false)
    private String address;

    @Column(nullable = false)
    private String location;

    @Column(nullable = false)
    private String content;

    @Column(nullable = false)
    private Integer capacity;

    @Column(nullable = false)
    private LocalDateTime cancellationDeadline;

    @Column(nullable = false)
    private Integer productPrice;

    @Column(nullable = false)
    private String productPhone;

    private Double latitude;

    private Double longitude;

    @Column(nullable = false)
    private Boolean deleted = false;

    private String imageUrl;

    @ManyToOne
    @JoinColumn(name = "FAVORITE_ID")
    private Favorite favorite;

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    @OneToMany(mappedBy = "product")
    private Review review;
}
