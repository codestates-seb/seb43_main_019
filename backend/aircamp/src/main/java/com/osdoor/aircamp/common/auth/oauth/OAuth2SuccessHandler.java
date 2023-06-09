package com.osdoor.aircamp.common.auth.oauth;

import com.osdoor.aircamp.common.auth.jwt.JwtTokenizer;
import com.osdoor.aircamp.member.entity.Member;
import com.osdoor.aircamp.member.repositoy.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Slf4j
@Component
@RequiredArgsConstructor
public class OAuth2SuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    @Value("${customPath.redirectUrl}")
    private String REDIRECT_URL;
    private final JwtTokenizer jwtTokenizer;
    private final MemberRepository memberRepository;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        CustomOAuth2User oAuth2User = (CustomOAuth2User) authentication.getPrincipal();
        Map<String, Object> kakao_account = (Map<String, Object>) oAuth2User.getAttributes().get("kakao_account");
        Map<String, Object> profile = (Map<String, Object>) kakao_account.get("profile");
        String email = (String) kakao_account.get("email");

        Member member = memberRepository.findByEmail(email).orElseThrow();
        Map<String, Object> claims = new HashMap<>();
        claims.put("email", member.getEmail());
        claims.put("nickname", member.getName());
        claims.put("roles", member.getRoles());
        claims.put("memberId", member.getMemberId());

        log.info("# JWT 토큰 생성");
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getAccessTokenExpirationMinutes());
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());
        String accessToken = jwtTokenizer.generateAccessToken(claims, email, expiration, base64EncodedSecretKey);
        String refreshToken = jwtTokenizer.generateRefreshToken(email, expiration, base64EncodedSecretKey);

        String url = makeRedirectUrl(accessToken, refreshToken);
        getRedirectStrategy().sendRedirect(request, response, url);
    }

    private String makeRedirectUrl(String accessToken, String refreshToken) {
        return UriComponentsBuilder
                .fromUriString(REDIRECT_URL + "/oauth2/redirect?accessToken=" + accessToken + "&refreshToken=" + refreshToken)
                .build()
                .toUriString();
    }
}
