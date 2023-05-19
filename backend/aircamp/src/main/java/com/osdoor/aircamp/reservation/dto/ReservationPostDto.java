package com.osdoor.aircamp.reservation.dto;

import com.osdoor.aircamp.member.entity.Member;
import lombok.Getter;
import javax.validation.constraints.Positive;
import java.time.LocalDate;
import java.time.LocalDateTime;


@Getter
public class ReservationPostDto {
    @Positive
    private long memberId;

    private long productId;

    private LocalDate reservationDate;

    private String reservationName;

    private String reservationPhone;

    private String reservationEmail;

    // 예약을 등록할 때 사용되는 ReservationPostDto 객체에 저장된 memberId 를 이용해 새로운 Member 객체를 생성하고 반환하는 메서드.
    public Member getMember() {
        Member member = new Member();
        member.setMemberId(memberId);
        return member;
    }
}


