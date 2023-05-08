package com.osdoor.aircamp.member.service;

import com.osdoor.aircamp.helper.email.VerificationEmail;
import com.osdoor.aircamp.member.entity.Favorite;
import com.osdoor.aircamp.member.entity.Member;
import com.osdoor.aircamp.exception.BusinessLogicException;
import com.osdoor.aircamp.exception.ExceptionCode;
import com.osdoor.aircamp.helper.event.MemberRegistrationEvent;
import com.osdoor.aircamp.member.repositoy.MemberRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
@Slf4j
public class MemberService {
    private final MemberRepository memberRepository;
    private final ApplicationEventPublisher publisher;
    private final VerificationEmail verificationEmail;

    public MemberService(MemberRepository memberRepository, ApplicationEventPublisher publisher, VerificationEmail verificationEmail) {
        this.memberRepository = memberRepository;
        this.publisher = publisher;
        this.verificationEmail = verificationEmail;
    }
    public Member createMember(Member member) {
        verifyExistsEmail(member.getEmail());
        member.setFavorite(new Favorite());
//        String token = generateVerificationToken();
//        member.setVerificationToken(token);
//
        publisher.publishEvent(new MemberRegistrationEvent(this, member)); // 이벤트 발행

        return memberRepository.save(member);
    }
//    public Member completeRegistration(String email, String token) {
//        Member member = memberRepository.findByEmail(email).get();
//        if (member.getVerificationToken().equals(token)) {
//            member.setEmailVerified(true);
//        }
//        return updateMember(member);
//    }

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

//        Optional.ofNullable(member.getVerificationToken())
//                .ifPresent(findMember::setVerificationToken);
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
    public String sendVerificationCode(String email) throws Exception {
        return verificationEmail.sendMessage(email);
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

//    private String generateVerificationToken() {
//        // 랜덤한 문자열 생성
//        String token = UUID.randomUUID().toString();
//
//        // 데이터베이스에 해당 토큰이 이미 존재하는지 확인
//        while (memberRepository.existsByVerificationToken(token)) {
//            token = UUID.randomUUID().toString();
//        }
//
//        return token;
//    }
}
