package com.finance.manager.securityUtils;

import com.finance.manager.exeptions.AccessDeniedException;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
public class JwtService
{
    private final JwtProps jwtProps;

    private final UserDetailsService userDetailsService;

    private SecretKey key;

    public JwtService(JwtProps jwtProps, UserDetailsService userDetailsService) {
        this.jwtProps = jwtProps;
        this.userDetailsService = userDetailsService;
    }

    @PostConstruct
    public void init ()
    {
        this.key = Keys.hmacShaKeyFor(jwtProps.getSecret().getBytes());
    }

    public String generateAccessToken(UserDetails userDetails)
    {
        return generateAccessToken(userDetails, new HashMap<>());
    }

    public String generateAccessToken(UserDetails userDetails, Map<String, String> extraClaims)
    {
        Date now = new Date();
        Date validity = new Date(now.getTime() + jwtProps.getAccess());

        String role = convertToStrRoles(userDetails.getAuthorities());

        return Jwts.builder()
                .claims(extraClaims)
                .subject(userDetails.getUsername())
                .claim("role", role)
                .issuedAt(now)
                .expiration(validity)
                .signWith(key)
                .compact();
    }

    public String generateRefreshToken(UserDetails userDetails) {
        Date now = new Date();
        Date validity = new Date(now.getTime() + jwtProps.getRefresh());

        String role = convertToStrRoles(userDetails.getAuthorities());

        return Jwts.builder()
                .subject(userDetails.getUsername())
                .claim("role", role)
                .issuedAt(now)
                .expiration(validity)
                .signWith(key)
                .compact();
    }

    public JwtResponse refreshUserTokens(String refreshToken) {
        if(isTokenExpired(refreshToken)) {
            throw new AccessDeniedException("Refresh token is expired");
        }

        final String username = extractUsername(refreshToken);
        UserDetails userDetails = userDetailsService.loadUserByUsername(username);

        JwtResponse response = new JwtResponse();
        response.setAccessToken(generateAccessToken(userDetails));
        response.setAccessToken(generateRefreshToken(userDetails));

        return response;
    }

    private String convertToStrRoles(Collection<? extends GrantedAuthority> authorities) {
        return authorities.stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(", "));
    }

    public boolean isTokenValid(String token, UserDetails userDetails) {
        final String username = extractUsername(token);

        String role = (String) extractClaim(token, claims -> claims.get("role"));
        String userDetailsRoles = convertToStrRoles(userDetails.getAuthorities());

        return userDetails.getUsername().equals(username) &&
                userDetailsRoles.equals(role) &&
                !isTokenExpired(token);
    }

    public boolean isTokenExpired(String token) {
        final Date now = new Date();
        return extractExpiration(token).before(now);
    }

    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    public boolean validateToken(String token) {
        Claims claims = extractAllClaims(token);
        return true;
    }

    public static Date convertLocalDateTimeToDate(LocalDateTime localDateTime) {
        ZoneId zoneId = ZoneId.systemDefault();
        return Date.from(localDateTime.atZone(zoneId).toInstant());
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parser()
                .verifyWith(key)
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }
}
