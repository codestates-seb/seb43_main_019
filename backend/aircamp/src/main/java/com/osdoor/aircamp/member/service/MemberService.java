package com.osdoor.aircamp.member.service;

import com.osdoor.aircamp.auth.utils.AuthorizationUtils;
import com.osdoor.aircamp.auth.utils.CustomAuthorityUtils;
import com.osdoor.aircamp.helper.email.VerificationEmail;
import com.osdoor.aircamp.member.entity.Favorite;
import com.osdoor.aircamp.member.entity.Member;
import com.osdoor.aircamp.exception.BusinessLogicException;
import com.osdoor.aircamp.exception.ExceptionCode;
import com.osdoor.aircamp.helper.event.MemberRegistrationEvent;
import com.osdoor.aircamp.member.repositoy.MemberRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
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
    private final PasswordEncoder passwordEncoder;
    private final CustomAuthorityUtils authorityUtils;
    private final AuthorizationUtils authorizationUtils;
    private final VerificationEmail verificationEmail;
  
    public MemberService(MemberRepository memberRepository,
                         ApplicationEventPublisher publisher,
                         PasswordEncoder passwordEncoder,
                         CustomAuthorityUtils authorityUtils, 
                         AuthorizationUtils authorizationUtils,
                         VerificationEmail verificationEmail) {
        this.memberRepository = memberRepository;
        this.publisher = publisher;
        this.passwordEncoder = passwordEncoder;
        this.authorityUtils = authorityUtils;
        this.authorizationUtils = authorizationUtils;
        this.verificationEmail = verificationEmail;
    }
  
    public Member createMember(Member member) {
        verifyExistsEmail(member.getEmail());
        member.setFavorite(new Favorite());
        member.setCreatedBy(setByField(member));
        member.setModifiedBy(setByField(member));
//        String token = generateVerificationToken();
//        member.setVerificationToken(token);

        member.setPassword(passwordEncoder.encode(member.getPassword()));
        member.setRoles(authorityUtils.createRoles(member.getEmail()));

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
        authorizationUtils.verifyAuthorizedMember(findMember.getEmail());

        Optional.ofNullable(member.getName())
                .ifPresent(findMember::setName);

        Optional.ofNullable(member.getPassword())
                .ifPresent(password -> findMember.setPassword(passwordEncoder.encode(password)));  // 비밀번호 수정시에도 수정되는 비밀번호에 암호화가 적용된다.

        Optional.ofNullable(member.getPhone())
                .ifPresent(findMember::setPhone);

        Optional.ofNullable(member.getMemberStatus())
                .ifPresent(findMember::setMemberStatus);

        Optional.ofNullable(member.getUsageCount())
                .ifPresent(findMember::setUsageCount);  // 예약 시 이용횟수 + 1 추가

        findMember.setModifiedBy(setByField(member));
//        Optional.ofNullable(member.getVerificationToken())
//                .ifPresent(findMember::setVerificationToken);
        findMember.setModifiedAt(LocalDateTime.now());

        if (member.isSellerVerified()) {
            findMember.getRoles().add("SELLER");
        }

        return memberRepository.save(findMember);
    }

    @Transactional(readOnly = true)
    public Member findMember(long memberId) {
        Member findMember = findVerifiedMember(memberId);
        authorizationUtils.verifyAuthorizedMember(findMember.getEmail());
        return findMember;
    }

    public List<Member> findMembers() {
        return memberRepository.findAll();
    }

    public void deleteMember(long memberId) {
        Member member = findVerifiedMember(memberId); // 아이디에 맞는 회원객체를 db에서 불러온다
        authorizationUtils.verifyAuthorizedMember(member.getEmail());
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
    public Member reSignupMember(Member member) {
        Member findMember = findVerifiedMember(member.getMemberId());

        Optional.ofNullable(member.getMemberStatus())
                .ifPresent(findMember::setMemberStatus);

        findMember.setModifiedAt(LocalDateTime.now());

        return memberRepository.save(findMember);
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
    // 비로그인 상태라면 회원가입하는 회원의 이메일을 by필드에 넣고, 로그인 상태라면 로그인한 사용자의 이메일을 by필드에 넣는다. 분기가 될 수 있도록 조건문사용.
    // 관리자가 로그인해서 임시계정을 만든다면 해당 계정의 by필드에는 관리자의 이메일이 들어간다.
    private String setByField(Member member) {
        String loginPrincipal = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if(loginPrincipal.equals("anonymousUser")) return member.getEmail(); // 비로그인상태일때는 spring이 자체적으로 principal에 anonymousUser 라는 String값을 넣는다.
        else return SecurityContextHolder.getContext().getAuthentication().getName();
    }
}
