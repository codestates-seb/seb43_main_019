package com.osdoor.aircamp.product.entity;

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
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

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

    @Column(nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(nullable = false)
    private String createdBy;

    @Column(nullable = false)
    private LocalDateTime modifiedAt = LocalDateTime.now();

    @Column(nullable = false)
    private String modifiedBy;

    private String imageUrl;

//    @ManyToOne TODO
//    @JoinColumn(name = "FAVORITE_ID")
//    private Favorite favorite;

//    @ManyToOne TODO
//    @JoinColumn(name = "MEMBER_ID")
//    private Member member;
}
