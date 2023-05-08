package com.osdoor.aircamp.reservation.dto;

import com.osdoor.aircamp.member.entity.Member;
import lombok.Getter;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;

@Getter
public class ReservationPostDto {
    @Positive
    private long memberId;

    /** ReservationProductDto, reservationProducts 클래스, MemberService 구현되면 주석 해제 */
//    @Valid
//    private List<ReservationProductDto> reservationProducts;

    public Member getMember() {
        Member member = new Member();
        member.setMemberId(memberId);
        return member;
    }
}


