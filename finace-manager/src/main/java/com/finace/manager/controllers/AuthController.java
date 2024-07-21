package com.finace.manager.controllers;

import com.finace.manager.entities.Role;
import com.finace.manager.entities.User;
import com.finace.manager.requests.security.SignInRequest;
import com.finace.manager.requests.security.SignUpRequest;
import com.finace.manager.requests.validation.OnCreate;
import com.finace.manager.securityUtils.JwtEntity;
import com.finace.manager.securityUtils.JwtRefreshRequest;
import com.finace.manager.securityUtils.JwtResponse;
import com.finace.manager.securityUtils.SimpleAuthService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController
{
    private final SimpleAuthService authService;

    public AuthController(SimpleAuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<JwtResponse> registerUser(
            @RequestBody @Validated(OnCreate.class) SignUpRequest request
    )
    {
        JwtEntity jwtEntity = complateJwtEntity(request, Role.ROLE_USER);
        JwtResponse response = authService.register(jwtEntity);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/admin/register")
    public ResponseEntity<JwtResponse> registerAdmin(
            @RequestBody @Validated(OnCreate.class) SignUpRequest request
    )
    {
        JwtEntity jwtEntity = complateJwtEntity(request, Role.ROLE_ADMIN);
        JwtResponse response = authService.register(jwtEntity);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/login")
    public ResponseEntity<JwtResponse> login(
            @RequestBody @Valid SignInRequest signInRequest
    )
    {
        return ResponseEntity.ok(authService.authenticate(signInRequest));
    }

    @GetMapping("/validate")
    public ResponseEntity<?> validateToken(
            @RequestParam("token") String token
    )
    {
        authService.validate(token);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/refresh")
    public ResponseEntity<JwtResponse> refresh(@RequestBody JwtRefreshRequest refreshRequest)
    {
        JwtResponse response = authService.refresh(refreshRequest);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/logout")
    public ResponseEntity<JwtResponse> logout()
    {
        JwtResponse response = new JwtResponse();
        return ResponseEntity.ok(response);
    }

    private JwtEntity complateJwtEntity(SignUpRequest request, Role role)
    {
        return new JwtEntity(() -> {
            User user = new User(request.getEmail(), request.getLogin(), request.getPassword());
            user.setRole(role);
            return user;
        });
    }
}
