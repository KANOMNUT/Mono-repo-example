package com.example.demo.security;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class JwtTokenProviderTest {

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Test
    public void whenCreateToken_thenValidateSuccessfully() {
        String username = "testuser";
        String token = jwtTokenProvider.createToken(username);

        assertTrue(jwtTokenProvider.validateToken(token));
        assertEquals(username, jwtTokenProvider.getUsername(token));
    }

    @Test
    public void whenInvalidToken_thenValidationFails() {
        assertFalse(jwtTokenProvider.validateToken("invalid.token.here"));
    }

    @Test
    public void whenGetAuthentication_thenPrincipalIsCorrect() {
        String username = "testuser";
        String token = jwtTokenProvider.createToken(username);

        Authentication auth = jwtTokenProvider.getAuthentication(token);
        assertEquals(username, auth.getName());
    }
}