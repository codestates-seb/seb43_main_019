package com.osdoor.aircamp.helper.event;

import com.osdoor.aircamp.member.entity.Member;
import lombok.Getter;
import org.springframework.context.ApplicationEvent;

@Getter
public class MemberRegistrationEvent extends ApplicationEvent {
    private Member member;
//    private String token;
    public MemberRegistrationEvent(Object object, Member member) {
        super(object);
        this.member = member;
//        this.token = token;
    }
}
