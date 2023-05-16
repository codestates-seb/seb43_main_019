package com.osdoor.aircamp.auth.oauth;

import com.osdoor.aircamp.auth.jwt.JwtTokenizer;
import com.osdoor.aircamp.member.repositoy.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

@Slf4j
@Component
@RequiredArgsConstructor
public class OAuth2SuccessHandler implements AuthenticationSuccessHandler  {

    private final JwtTokenizer jwtTokenizer;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
        Map<String, Object> kakao_account = (Map<String, Object>) oAuth2User.getAttributes().get("kakao_account");
        Map<String, Object> profile = (Map<String, Object>) kakao_account.get("profile");
        String email = (String) kakao_account.get("email");

        Map<String, Object> claims = new HashMap<>();
        claims.put("email", email);
        claims.put("nickname", profile.get("nickname"));
        claims.put("roles", oAuth2User.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList()));

        log.info("# JWT 토큰 생성");
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getAccessTokenExpirationMinutes());
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());
        String accessToken = jwtTokenizer.generateAccessToken(claims, email, expiration, base64EncodedSecretKey);
        String refreshToken = jwtTokenizer.generateRefreshToken(email, expiration, base64EncodedSecretKey);

        response.setHeader("Authorization", "Bearer " + accessToken);
        response.setHeader("Refresh", refreshToken);
        response.sendRedirect("/");
    }
}
