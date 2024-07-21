package com.finace.manager.securityUtils;

import com.finace.manager.entities.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.function.Supplier;

public class JwtEntity implements UserDetails
{
    private User user;
    private Supplier<User> userSupplier;

    public JwtEntity() {
    }

    public JwtEntity(User user, Supplier<User> userSupplier) {
        this.user = user;
        this.userSupplier = userSupplier;
    }

    public JwtEntity(Supplier<User> userSupplier)
    {
        this.userSupplier = userSupplier;
    }

    public User getUser() {
        return ensureUser();
    }

    public void setUser(User user) {
        this.user = user;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    @Override
    public String getPassword() {
        return ensureUser().getPassword_hash();
    }

    public void setPassword(String passwordHash)
    {
        ensureUser().setPassword_hash(passwordHash);
    }

    @Override
    public String getUsername() {
        return ensureUser().getUsername();
    }

    public void setUsername(String username)
    {
        ensureUser().setUsername(username);
    }

    public String getEmail()
    {
        return ensureUser().getEmail();
    }

    public void setEmail(String email)
    {
        ensureUser().setEmail(email);
    }
    @Override
    public boolean isAccountNonExpired() {
        return ensureUser().getIs_account_non_expired();
    }

    public void setIsAccountNonExpired(Boolean isAccountNonExpired)
    {
        ensureUser().setIs_account_non_expired(isAccountNonExpired);
    }

    @Override
    public boolean isAccountNonLocked() {
        return ensureUser().getIs_account_non_locked();
    }

    public void setIsAccountNonLocked(Boolean isAccountNonLocked)
    {
        ensureUser().setIs_account_non_locked(isAccountNonLocked);
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return ensureUser().getIs_credentials_non_expired();
    }

    public void setSsCredentialsNonExpired(Boolean isCredentialsNonExpired)
    {
        ensureUser().setIs_credentials_non_expired(isCredentialsNonExpired);
    }

    @Override
    public boolean isEnabled() {
        return ensureUser().getIs_enabled();
    }

    public void setIsEnabled(Boolean isEnabled)
    {
        ensureUser().setIs_enabled(isEnabled);
    }

    public Boolean getIsAccountDeleted()
    {
        return ensureUser().getIs_deleted();
    }

    public void setIsAccountDeleted(Boolean isDeleted)
    {
        ensureUser().setIs_deleted(isDeleted);
    }

    private User ensureUser() {
        if (user == null) user = userSupplier.get();
        return user;
    }
}
