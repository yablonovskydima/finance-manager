package com.finace.manager.entities;

import jakarta.persistence.*;

@Entity
@Table(
    name = "users", uniqueConstraints = {
            @UniqueConstraint(columnNames = "username", name = "uq_users_username")
    }
)
public class User
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "email", nullable = false, unique = true)
    private String email;
    @Column(name = "username", nullable = false, length = 40, unique = true)
    private String username;
    @Column(name = "password_hash", nullable = false, length = 72)
    private String password_hash;

    @Column(name = "is_account_non_expired", nullable = false, columnDefinition="boolean default true")
    private Boolean is_account_non_expired;

    @Column(name = "is_account_non_locked", nullable = false, columnDefinition = "boolean default true")
    private Boolean is_account_non_locked;

    @Column(name = "is_credentials_non_expired", nullable = false, columnDefinition = "boolean default true")
    private Boolean is_credentials_non_expired;

    @Column(name = "is_enabled", nullable = false, columnDefinition = "boolean default true")
    private Boolean is_enabled;

    @Column(name = "is_deleted", nullable = false, columnDefinition = "boolean default false")
    private Boolean is_deleted;
    @Column(name = "role", nullable = false)
    private Role role;

    public User(Long id,
                String username,
                String password_hash,
                Boolean is_account_non_expired,
                Boolean is_account_non_locked,
                Boolean is_credentials_non_expired,
                Boolean is_enabled,
                Boolean is_deleted,
                Role role) {
        this.id = id;
        this.username = username;
        this.password_hash = password_hash;
        this.is_account_non_expired = is_account_non_expired;
        this.is_account_non_locked = is_account_non_locked;
        this.is_credentials_non_expired = is_credentials_non_expired;
        this.is_enabled = is_enabled;
        this.is_deleted = is_deleted;
        this.role = role;
    }

    public User() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword_hash() {
        return password_hash;
    }

    public void setPassword_hash(String password_hash) {
        this.password_hash = password_hash;
    }

    public Boolean getIs_account_non_expired() {
        return is_account_non_expired;
    }

    public void setIs_account_non_expired(Boolean is_account_non_expired) {
        this.is_account_non_expired = is_account_non_expired;
    }

    public Boolean getIs_account_non_locked() {
        return is_account_non_locked;
    }

    public void setIs_account_non_locked(Boolean is_account_non_locked) {
        this.is_account_non_locked = is_account_non_locked;
    }

    public Boolean getIs_credentials_non_expired() {
        return is_credentials_non_expired;
    }

    public void setIs_credentials_non_expired(Boolean is_credentials_non_expired) {
        this.is_credentials_non_expired = is_credentials_non_expired;
    }

    public Boolean getIs_enabled() {
        return is_enabled;
    }

    public void setIs_enabled(Boolean is_enabled) {
        this.is_enabled = is_enabled;
    }

    public Boolean getIs_deleted() {
        return is_deleted;
    }

    public void setIs_deleted(Boolean is_deleted) {
        this.is_deleted = is_deleted;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }
}
