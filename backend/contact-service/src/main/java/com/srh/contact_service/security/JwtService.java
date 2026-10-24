package com.srh.contact_service.security;



import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;

@Service
public class JwtService {

    private static final String SECRET =
            "TravelTourSecretKeyForJwtAuthentication2026MustBeLongEnough";

    private final SecretKey key = Keys.hmacShaKeyFor(
            SECRET.getBytes(StandardCharsets.UTF_8)
    );

    public String extractUsername(String token) {

        return Jwts.parser()
                .verifyWith(key)
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .getSubject();
    }

    public String extractRole(String token) {

        return Jwts.parser()
                .verifyWith(key)
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .get("role", String.class);
    }

    public boolean isTokenValid(
            String token,
            String username) {

        try {

            var claims = Jwts.parser()
                    .verifyWith(key)
                    .build()
                    .parseSignedClaims(token)
                    .getPayload();

            String extractedUsername = claims.getSubject();

            Date expirationDate = claims.getExpiration();

            boolean usernameMatches =
                    extractedUsername.equals(username);

            boolean notExpired =
                    expirationDate.after(new Date());

            return usernameMatches && notExpired;

        } catch (Exception e) {

            System.out.println(
                    "TOKEN VALIDATION ERROR: "
                            + e.getMessage()
            );

            return false;
        }
    }
}