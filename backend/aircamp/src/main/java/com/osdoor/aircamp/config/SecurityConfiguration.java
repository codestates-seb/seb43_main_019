package com.osdoor.aircamp.config;

import com.osdoor.aircamp.auth.filter.JwtAuthenticationFilter;
import com.osdoor.aircamp.auth.filter.JwtVerificationFilter;
import com.osdoor.aircamp.auth.handler.MemberAccessDeniedHandler;
import com.osdoor.aircamp.auth.handler.MemberAuthenticationEntryPoint;
import com.osdoor.aircamp.auth.handler.MemberAuthenticationFailureHandler;
import com.osdoor.aircamp.auth.handler.MemberAuthenticationSuccessHandler;
import com.osdoor.aircamp.auth.jwt.JwtTokenizer;
import com.osdoor.aircamp.auth.utils.CustomAuthorityUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

import static org.springframework.security.config.Customizer.*;

@Configuration
@RequiredArgsConstructor
public class SecurityConfiguration {

    private final JwtTokenizer jwtTokenizer;
    private final CustomAuthorityUtils authorityUtils;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.
                headers().frameOptions().sameOrigin()
                .and()
                .csrf().disable()
                .cors(withDefaults())
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS) // 세션을 생성하지 않음
                .and()
                .formLogin().disable()
                .httpBasic().disable()
                .exceptionHandling()
                .authenticationEntryPoint(new MemberAuthenticationEntryPoint())
                .accessDeniedHandler(new MemberAccessDeniedHandler())
                .and()
                .apply(new CustomFilterConfigurer())
                .and()
                .authorizeHttpRequests(authorize -> authorize
                        .antMatchers(HttpMethod.POST, "/api/members").permitAll()
                        .antMatchers(HttpMethod.PATCH, "/api/members/**").hasRole("USER")
                        .antMatchers(HttpMethod.GET, "/api/members").hasRole("ADMIN")
                        .antMatchers(HttpMethod.GET, "/api/members/**").hasAnyRole("USER", "ADMIN")
                        .antMatchers(HttpMethod.DELETE, "/api/members/**").hasRole("USER")
                        .antMatchers(HttpMethod.POST, "/api/products").hasRole("SELLER")
                        .antMatchers(HttpMethod.PATCH, "/api/products/**").hasRole("SELLER")
                        .antMatchers(HttpMethod.GET, "/api/products").permitAll()
                        .antMatchers(HttpMethod.GET, "/api/products/**").permitAll()
                        .antMatchers(HttpMethod.DELETE, "/api/products/**").hasRole("SELLER")
                        .antMatchers(HttpMethod.POST, "/api/reservations").hasRole("USER")
                        .antMatchers(HttpMethod.PATCH, "/api/reservations/**").hasRole("SELLER")
                        .antMatchers(HttpMethod.GET, "/api/reservations/**").hasAnyRole("USER", "SELLER")
                        .antMatchers(HttpMethod.DELETE, "/api/reservations/**").hasRole("SELLER")
                        .anyRequest().permitAll()
                );

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("*"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PATCH", "DELETE"));
        configuration.setAllowedHeaders(Arrays.asList("Content-Type", "Authorization"));
        configuration.setExposedHeaders(Arrays.asList("Authorization", "Refresh"));

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    // JwtAuthenticationFilter 등록
    public class CustomFilterConfigurer extends AbstractHttpConfigurer<CustomFilterConfigurer, HttpSecurity> {
        @Override
        public void configure(HttpSecurity builder)  {
            AuthenticationManager authenticationManager = builder.getSharedObject(AuthenticationManager.class);

            JwtAuthenticationFilter jwtAuthenticationFilter = new JwtAuthenticationFilter(authenticationManager, jwtTokenizer);
            jwtAuthenticationFilter.setFilterProcessesUrl("/api/login");
            jwtAuthenticationFilter.setAuthenticationSuccessHandler(new MemberAuthenticationSuccessHandler());
            jwtAuthenticationFilter.setAuthenticationFailureHandler(new MemberAuthenticationFailureHandler());

            JwtVerificationFilter jwtVerificationFilter = new JwtVerificationFilter(jwtTokenizer, authorityUtils);

            builder.addFilter(jwtAuthenticationFilter)
                    .addFilterAfter(jwtVerificationFilter, JwtAuthenticationFilter.class);
        }
    }
}
