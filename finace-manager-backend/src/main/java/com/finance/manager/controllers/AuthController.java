package com.finance.manager.controllers;

import com.finance.manager.entities.Role;
import com.finance.manager.entities.User;
import com.finance.manager.requests.security.ChangeRequest;
import com.finance.manager.requests.security.SignInRequest;
import com.finance.manager.requests.security.SignUpRequest;
import com.finance.manager.requests.validation.OnCreate;
import com.finance.manager.securityUtils.JwtEntity;
import com.finance.manager.securityUtils.JwtRefreshRequest;
import com.finance.manager.securityUtils.JwtResponse;
import com.finance.manager.securityUtils.SimpleAuthService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
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

    @PutMapping("/users/{username}/change-password")
    public ResponseEntity<?> changePassword(@PathVariable String username,
                                            @RequestBody ChangeRequest request)
    {
        if (request.getOldValue().equals(request.getNewValue()))
        {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Old password matches new password.");
        }
        authService.changePassword(username, request);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/users/{username}/change-username")
    public ResponseEntity<?> changeUsername(@PathVariable String username,
                                            @RequestBody ChangeRequest request)
    {
        if (request.getOldValue().equals(request.getNewValue()))
        {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Old username matches new username.");
        }
        authService.changeUsername(username, request);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/users/{username}/change-email")
    public ResponseEntity<?> changeEmail(@PathVariable String username,
                                            @RequestBody ChangeRequest request)
    {
        if (request.getOldValue().equals(request.getNewValue()))
        {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Old email matches new email.");
        }
        authService.changeEmail(username, request);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/users/{username}/drop-account")
    public ResponseEntity<?> dropAccount(@PathVariable("username") String username)
    {
        authService.deleteAccount(username);
        return ResponseEntity.accepted().build();
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
