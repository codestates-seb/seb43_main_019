package com.osdoor.aircamp.member.entity;

import com.osdoor.aircamp.product.entity.Product;
import com.osdoor.aircamp.reservation.entity.Reservation;

import com.osdoor.aircamp.review.entity.Review;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
@NoArgsConstructor
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberId;

    @Column(length = 100, nullable = false)
    private String name;

    @Column(updatable = false, unique = true)
    private String email;

    private String birthDate;
  
    private String password;

    @Column(nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column
    private String createdBy;

    @Column(nullable = false, name = "LAST_MODIFIED_AT")
    private LocalDateTime modifiedAt = LocalDateTime.now();

    @Column
    private String modifiedBy;

    @Column(unique = true)
    private String phone;

    @Column(nullable = false)
    private int reward_points; // 마일리지의 소수점은 절삭된다.(정수형)

    @Enumerated(EnumType.STRING)
    @Column(length = 20, nullable = false)
    private MemberStatus memberStatus = MemberStatus.MEMBER_ACTIVE;

    @Enumerated(EnumType.STRING)
    @Column(length = 20, nullable = false)
    private MemberShip memberShip = MemberShip.BASIC;

    @Column(nullable = false)
    private int usageCount;  // 회원의 이용횟수를 카운트 하기 위한 필드.

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(joinColumns = @JoinColumn(name = "MEMBER_ID"))
    private List<String> roles = new ArrayList<>();

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "Favorite_ID")
    private Favorite favorite;  // 유저의 즐겨찾기

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
    private List<Product> products = new ArrayList<>();  // 판매자가 등록한 캠핑장들.

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
    private List<Reservation> reservations = new ArrayList<>();  // 유져의 예약 리스트.

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
    private List<Review> reviews = new ArrayList<>();  // 유져가 작성한 리뷰들.

    @Column(name = "EMAIL_VERIFIED")
    private boolean isEmailVerified;

    @Column
    private boolean sellerVerified;
    @Column
    private String businessRegistrationNumber;

    @Column
    private String businessRegistrationDate;

    private String provider;

    // enum 데이터
    public enum MemberStatus {
        MEMBER_ACTIVE("활동중"),
        MEMBER_QUIT("탈퇴 상태");

        @Getter
        private String status;
        MemberStatus(String status) {
            this.status = status;
        }
    }
    public enum MemberShip {
        BASIC("기본등급"),
        VIP("우수회원");
        @Getter
        private String status;
        MemberShip(String status) {
            this.status = status;
        }
    }
}

