package com.finance.manager.securityUtils;

import com.finance.manager.requests.security.ChangeRequest;

public interface AuthService
{
    JwtResponse register(JwtEntity jwtEntity);
    JwtResponse authenticate(JwtRequest jwtRequest);
    JwtResponse refresh(JwtRefreshRequest refreshRequest);
    boolean validate(String token);
    void changePassword(String username, ChangeRequest request);
    void changeUsername(String username, ChangeRequest request);
    void changeEmail(String username, ChangeRequest request);
    void deleteAccount(String username);
    void restoreAccount(String username);
}
