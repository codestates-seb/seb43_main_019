package com.osdoor.aircamp.auth.oauth;

import com.osdoor.aircamp.auth.utils.CustomAuthorityUtils;
import com.osdoor.aircamp.exception.BusinessLogicException;
import com.osdoor.aircamp.exception.ExceptionCode;
import com.osdoor.aircamp.member.entity.Favorite;
import com.osdoor.aircamp.member.entity.Member;
import com.osdoor.aircamp.member.repositoy.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
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

        if(optionalMember.isPresent()) return optionalMember.orElseThrow();
        if(memberRepository.existsByEmail(auth2Attribute.getEmail())) {
            throw new BusinessLogicException(ExceptionCode.MEMBER_EXISTS);
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
