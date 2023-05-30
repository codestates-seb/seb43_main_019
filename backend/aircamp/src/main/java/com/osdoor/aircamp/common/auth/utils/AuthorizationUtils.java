package com.osdoor.aircamp.common.auth.utils;

import com.osdoor.aircamp.common.exception.BusinessLogicException;
import com.osdoor.aircamp.common.exception.ExceptionCode;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import java.util.Collection;

@Component
public class AuthorizationUtils {

    public void verifyAuthorizedMember(String email) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if(authentication != null && authentication.isAuthenticated()) {
            if(hasAdminRole(authentication)) return;
            if(!authentication.getName().equals(email)) {
                throw new BusinessLogicException(ExceptionCode.MEMBER_NOT_VALID);
            }
        }
    }

    private boolean hasAdminRole(Authentication authentication) {
        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();

        for (GrantedAuthority authority : authorities) {
            if ("ROLE_ADMIN".equals(authority.getAuthority())) {
                return true;
            }
        }

        return false;
    }
}
