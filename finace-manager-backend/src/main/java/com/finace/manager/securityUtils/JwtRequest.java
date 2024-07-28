package com.finace.manager.securityUtils;

import jakarta.validation.constraints.NotBlank;

public class JwtRequest
{
    @NotBlank(message = "Username can ot be empty.")
    private String username;

    @NotBlank(message = "Password cannot be empty.")
    private String password;

    public JwtRequest(String username, String password) {
        this.username = username;
        this.password = password;
    }

    public JwtRequest() {
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
