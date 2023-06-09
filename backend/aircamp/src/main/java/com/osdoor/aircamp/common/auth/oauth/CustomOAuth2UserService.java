package com.osdoor.aircamp.common.auth.oauth;

import com.osdoor.aircamp.common.auth.utils.CustomAuthorityUtils;
import com.osdoor.aircamp.member.entity.Favorite;
import com.osdoor.aircamp.member.entity.Member;
import com.osdoor.aircamp.member.repositoy.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.OAuth2Error;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class CustomOAuth2UserService implements OAuth2UserService<OAuth2UserRequest, OAuth2User> {

    private final MemberRepository memberRepository;
    private final CustomAuthorityUtils authorityUtils;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2UserService<OAuth2UserRequest, OAuth2User> delegate = new DefaultOAuth2UserService();
        OAuth2User oAuth2User = delegate.loadUser(userRequest);

        OAuth2Attribute attributes = OAuth2Attribute.of(userRequest, oAuth2User);

        Member member = saveOAuthUser(attributes);

        log.info("# OAuth User email={}, nickname={}", attributes.getEmail(), attributes.getNickname());

        return CustomOAuth2User.of(member.getMemberId(), attributes);
    }

    private Member saveOAuthUser(OAuth2Attribute auth2Attribute) {
        Optional<Member> optionalMember = memberRepository.findByEmailAndProvider(auth2Attribute.getEmail(), auth2Attribute.getProvider());

        if(optionalMember.isPresent()) {
            Member member = optionalMember.orElseThrow();
            if(member.getMemberStatus().getStatus().equals("탈퇴 상태")) {
                throw new OAuth2AuthenticationException(new OAuth2Error("탈퇴한 회원"), auth2Attribute.getEmail());
            }

            else return member;
        }

        if(memberRepository.existsByEmail(auth2Attribute.getEmail())) {
            throw new OAuth2AuthenticationException(new OAuth2Error("가입한 회원"), auth2Attribute.getEmail());
        }

        Member member = new Member();
        member.setEmail(auth2Attribute.getEmail());
        member.setName(auth2Attribute.getNickname());
        member.setProvider(auth2Attribute.getProvider());
        member.setCreatedBy(auth2Attribute.getNickname());
        member.setRoles(authorityUtils.createRoles(auth2Attribute.getEmail()));
        member.setFavorite(new Favorite());

        return memberRepository.save(member);
    }
}
