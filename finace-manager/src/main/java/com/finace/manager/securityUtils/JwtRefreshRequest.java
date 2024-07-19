package com.finace.manager.securityUtils;

public class JwtRefreshRequest
{
    private String refreshToken;

    public JwtRefreshRequest(String refreshToken) {
        this.refreshToken = refreshToken;
    }

    public JwtRefreshRequest() {
    }

    public String getRefreshToken() {
        return refreshToken;
    }

    public void setRefreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
    }
}
