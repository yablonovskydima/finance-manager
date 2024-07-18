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
}
