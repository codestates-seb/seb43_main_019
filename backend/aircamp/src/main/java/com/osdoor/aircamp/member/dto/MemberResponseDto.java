package com.osdoor.aircamp.member.dto;

import com.osdoor.aircamp.member.entity.Favorite;
import com.osdoor.aircamp.member.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class MemberResponseDto {
    private long memberId;
    private String name;
    private String email;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;
    private String createdBy;
    private String modifiedBy;
    private String phone;
    private int reward_points;
    private Member.MemberStatus memberStatus;
    private Member.MemberShip memberShip;
    private String birthDate;
    private int usageCount;
    private long favoriteId;
    private boolean isEmailVerified;
    private boolean isSellerVerified;
    private String businessRegistrationNumber;
    public void setFavorite(Favorite favorite) {
        this.favoriteId = favorite.getFavoriteId();
    }

}
