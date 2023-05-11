package com.osdoor.aircamp.product.entity;

import com.osdoor.aircamp.audit.Auditable;
import com.osdoor.aircamp.member.entity.Favorite;
import com.osdoor.aircamp.member.entity.Member;
import com.osdoor.aircamp.review.entity.Review;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.security.core.context.SecurityContextHolder;

import javax.persistence.*;
import java.time.LocalDateTime;
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

    @PrePersist //앤티티가 생성되기전에 onCreate가 호출(초기화)를 해준다.
    private void onCreate() {
        this.createdBy = SecurityContextHolder.getContext().getAuthentication().getName();
    }

    @PreUpdate  //앤티티가 수정되기전에 onUpdate가 호출(초기화)된다.
    private void onUpdate() {
        this.modifiedBy = SecurityContextHolder.getContext().getAuthentication().getName();
    }
  
    @OneToMany(mappedBy = "product")
    private List<Review> reviews;
}
