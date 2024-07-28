package com.finace.manager.requests.security;


import org.springframework.security.core.GrantedAuthority;

public class Role implements GrantedAuthority
{

    private String authority;

    public Role() {
    }

    public Role(String authority) {
        this.authority = authority;
    }

    public void setAuthority(String authority) {
        this.authority = authority;
    }

    @Override
    public String getAuthority() {
        return null;
    }
}
