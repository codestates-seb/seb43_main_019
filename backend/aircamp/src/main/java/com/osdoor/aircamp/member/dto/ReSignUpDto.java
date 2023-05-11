package com.osdoor.aircamp.member.dto;

import com.osdoor.aircamp.member.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ReSignUpDto {
    private long memberId;
    private Member.MemberStatus memberStatus;

    public void setMemberId(long memberId) {
        this.memberId = memberId;
    }
}
