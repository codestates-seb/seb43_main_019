package com.osdoor.aircamp.auth.oauth;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.util.Map;

@Getter
@NoArgsConstructor
public class OAuth2Attribute {

    private Long oauthId;
    private Map<String, Object> attributes;
    private String attributeKey;
    private String provider;
    private String email;
    private String nickname;
    private String profileImage;

    @Builder
    public OAuth2Attribute(Long oauthId,
                           Map<String, Object> attributes,
                           String attributeKey,
                           String provider,
                           String email,
                           String nickname,
                           String profileImage) {
        this.oauthId = oauthId;
        this.attributes = attributes;
        this.attributeKey = attributeKey;
        this.provider = provider;
        this.email = email;
        this.nickname = nickname;
        this.profileImage = profileImage;
    }

    public static OAuth2Attribute of(OAuth2UserRequest request, OAuth2User user) {
        String registrationId = request.getClientRegistration().getRegistrationId();
        String attributeName = request.getClientRegistration().getProviderDetails().getUserInfoEndpoint().getUserNameAttributeName();

        OAuth2Attribute oAuth2Attribute = null;
        if(registrationId.equals("kakao")) oAuth2Attribute = ofKakao(user, registrationId, attributeName);

        return oAuth2Attribute;
    }

    public static OAuth2Attribute ofKakao(OAuth2User user, String provider, String attributeKey) {
        Map<String, Object> attributes = user.getAttributes();
        Map<String, Object> kakaoAccount = (Map<String, Object>) attributes.get("kakao_account");
        Map<String, Object> profile = (Map<String, Object>) kakaoAccount.get("profile");

        String email = (String) kakaoAccount.get("email");
        String nickname = (String) profile.get("nickname");
        String profileImage = (String) profile.get("profile_image_url");

        return OAuth2Attribute.builder()
                .oauthId(user.getAttribute(attributeKey))
                .attributeKey(attributeKey)
                .attributes(attributes)
                .provider(provider)
                .email(email)
                .nickname(nickname)
                .profileImage(profileImage)
                .build();
    }
}