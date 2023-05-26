package com.osdoor.aircamp.product.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.osdoor.aircamp.audit.Auditable;
import com.osdoor.aircamp.member.entity.Favorite;
import com.osdoor.aircamp.member.entity.Member;
import com.osdoor.aircamp.review.entity.Review;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;

import java.util.List;

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
    private LocalDate cancellationDeadline;

    @Column(nullable = false)
    private Integer productPrice;

    @Column(nullable = false)
    private String productPhone;

    private Double latitude;

    private Double longitude;

    @Column(nullable = false)
    private Boolean deleted = false;

    private String imageUrl;

    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "FAVORITE_ID")
    private Favorite favorite;

    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    @JsonManagedReference
    @OneToMany(mappedBy = "product")
    private List<Review> reviews;
}
