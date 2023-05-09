package com.osdoor.aircamp.member.dto;

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
    private String phone;
    private int reward_points;
    private Member.MemberStatus memberStatus;
    private Member.MemberShip memberShip;
    private String birthDate;
    private int usageCount;
}
