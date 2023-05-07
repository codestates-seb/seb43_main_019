package com.osdoor.aircamp.member.service;

import com.osdoor.aircamp.member.entity.Member;
import com.osdoor.aircamp.member.exception.BusinessLogicException;
import com.osdoor.aircamp.member.exception.ExceptionCode;
import com.osdoor.aircamp.member.helper.event.MemberRegistrationEvent;
import com.osdoor.aircamp.member.repositoy.MemberRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@Transactional
@Slf4j
public class MemberService {
    private final MemberRepository memberRepository;
    private final ApplicationEventPublisher publisher;

    public MemberService(MemberRepository memberRepository, ApplicationEventPublisher publisher) {
        this.memberRepository = memberRepository;
        this.publisher = publisher;
    }

    public Member createMember(Member member) {
        verifyExistsEmail(member.getEmail());

        return memberRepository.save(member);
    }

    public Member updateMember(Member member) {
        Member findMember = findVerifiedMember(member.getMemberId());

        Optional.ofNullable(member.getName())
                .ifPresent(findMember::setName);

        Optional.ofNullable(member.getPassword())
                .ifPresent(findMember::setPassword);

        Optional.ofNullable(member.getPhone())
                .ifPresent(findMember::setPhone);

        Optional.ofNullable(member.getMemberStatus())
                .ifPresent(findMember::setMemberStatus);

        findMember.setModifiedAt(LocalDateTime.now());

        return memberRepository.save(findMember);
    }

    @Transactional(readOnly = true)
    public Member findMember(long memberId) {
        Member findMember = findVerifiedMember(memberId);

        return findMember;
    }

    public List<Member> findMembers() {
        return memberRepository.findAll();
    }

    public void deleteMember(long memberId) {
        Member member = findVerifiedMember(memberId); // 아이디에 맞는 회원객체를 db에서 불러온다
        member.setMemberStatus(Member.MemberStatus.MEMBER_QUIT); // 불러온 회원객체의 상태를 "탈퇴함"으로 수정한다.
        updateMember(member);
    }

    public Member findVerifiedMember(long memberId) {
        Optional<Member> optionalMember = memberRepository.findById(memberId);

        return optionalMember.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
    }

    private void verifyExistsEmail(String email) {
        Optional<Member> member = memberRepository.findByEmail(email);
        if (member.isPresent())
            throw new BusinessLogicException(ExceptionCode.MEMBER_EXISTS);
    }
}
