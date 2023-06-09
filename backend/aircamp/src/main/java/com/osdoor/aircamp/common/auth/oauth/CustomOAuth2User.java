package com.osdoor.aircamp.common.auth.oauth;

import lombok.AllArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.io.Serializable;
import java.util.Collection;
import java.util.Collections;
import java.util.Map;

@AllArgsConstructor
public class CustomOAuth2User implements OAuth2User, Serializable {

    private Long memberId;
    private Map<String, Object> attributes;
    private String attributeKey;

    public static CustomOAuth2User of(Long memberId, OAuth2Attribute oAuth2Attribute) {
        return new CustomOAuth2User(memberId, oAuth2Attribute.getAttributes(), oAuth2Attribute.getAttributeKey());
    }

    @Override
    public Map<String, Object> getAttributes() {
        return this.attributes;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singleton(new SimpleGrantedAuthority("USER"));
    }

    @Override
    public String getName() {
        return String.valueOf(attributes.get(attributeKey));
    }

    public Long getMemberId() {
        return this.memberId;
    }
}
