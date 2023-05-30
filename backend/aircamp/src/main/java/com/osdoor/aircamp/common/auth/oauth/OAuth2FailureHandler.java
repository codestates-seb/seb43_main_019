package com.osdoor.aircamp.common.auth.oauth;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
@Component
public class OAuth2FailureHandler extends SimpleUrlAuthenticationFailureHandler {

    @Value("${customPath.redirectUrl}")
    private String REDIRECT_URL;

    @Override
    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, AuthenticationException exception) throws IOException, ServletException {
        if(exception instanceof OAuth2AuthenticationException) {
            log.info("# {}: {}",((OAuth2AuthenticationException) exception).getError().getErrorCode() , exception.getMessage());
        }

        getRedirectStrategy().sendRedirect(request, response, REDIRECT_URL + "/login?error");
    }
}
