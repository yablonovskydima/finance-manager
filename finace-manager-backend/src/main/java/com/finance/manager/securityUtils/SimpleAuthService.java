package com.finance.manager.securityUtils;

import com.finance.manager.entities.Role;
import com.finance.manager.entities.User;
import com.finance.manager.exeptions.ValuesDoesNotMatchException;
import com.finance.manager.requests.security.ChangeRequest;
import com.finance.manager.requests.security.SignInRequest;
import com.finance.manager.requests.security.services.UserService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class SimpleAuthService implements AuthService
{
    private final UserService userService;
    private final JwtService jwtService;
    private final AuthenticationManager authManager;
    private final UserDetailsService userDetailsService;
    private final PasswordEncoder passwordEncoder;

    public SimpleAuthService(UserService userService,
                             JwtService jwtService,
                             AuthenticationManager authManager,
                             UserDetailsService userDetailsService
            , PasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.jwtService = jwtService;
        this.authManager = authManager;
        this.userDetailsService = userDetailsService;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public JwtResponse register(JwtEntity jwtEntity) {
        JwtRequest request = new JwtRequest(jwtEntity.getUsername(), jwtEntity.getPassword());
        User user = jwtEntity.getUser();
        create(user, Role.ROLE_USER);
        return authenticate(request);
    }

    private User create(User user, Role role) {
        user.setPassword_hash(passwordEncoder.encode(user.getPassword_hash()));
        user.setRole(role);
        User created = userService.create(user);
        created.setPassword_hash(user.getPassword_hash());
        return created;
    }

    public JwtResponse authenticate(SignInRequest request) {
        User user = userService.getByUsername(request.getUsername());
        JwtRequest jwtRequest = new JwtRequest(user.getUsername(), request.getPassword());
        return authenticate(jwtRequest);
    }
    @Override
    public JwtResponse authenticate(JwtRequest jwtRequest)
    {
        Authentication authentication = new UsernamePasswordAuthenticationToken(
                jwtRequest.getUsername(), jwtRequest.getPassword()
        );

        authentication = authManager.authenticate(authentication);

        UserDetails user = userDetailsService.loadUserByUsername(jwtRequest.getUsername());
        return createResponse(user);
    }

    private JwtRequest complateJwtRequest(String username, SignInRequest request) {
        User user = userService.getByUsername(username);
        return new JwtRequest(user.getUsername(), request.getPassword());
    }

    private JwtResponse createResponse(UserDetails user) {
        JwtEntity jwtEntity = (JwtEntity) user;

        String accessToken = jwtService.generateAccessToken(jwtEntity);
        String refreshToken = jwtService.generateRefreshToken(jwtEntity);

        JwtResponse response = new JwtResponse();
        response.setAccessToken(accessToken);
        response.setRefreshToken(refreshToken);

        return response;
    }

    @Override
    public JwtResponse refresh(JwtRefreshRequest refreshRequest) {
        return jwtService.refreshUserTokens(refreshRequest.getRefreshToken());
    }

    @Override
    public boolean validate(String token)
    {
        return jwtService.validateToken(token);
    }

    @Override
    public void changePassword(String username, ChangeRequest request)
    {
        User user = userService.getByUsername(username);

        if (!passwordEncoder.matches(request.getOldValue(), user.getPassword_hash()))
        {
            throw new ValuesDoesNotMatchException("Specified password does not match your password");
        }

        String newPassword = passwordEncoder.encode(request.getNewValue());
        user.setPassword_hash(newPassword);
        userService.update(user.getId(), user);
    }

    @Override
    public void changeUsername(String username, ChangeRequest request)
    {
        User user = userService.getByUsername(username);

        if (!passwordEncoder.matches(request.getOldValue(), user.getPassword_hash()))
        {
            throw new ValuesDoesNotMatchException("Specified username does not match yours");
        }

        user.setUsername(request.getNewValue());
        userService.update(user.getId(), user);
    }

    @Override
    public void changeEmail(String username, ChangeRequest request)
    {
        User user = userService.getByUsername(username);

        if (!compareValues(user.getEmail(), request.getOldValue()))
        {
            throw new ValuesDoesNotMatchException("Specified email does not match yours");
        }

        user.setEmail(request.getNewValue());
        userService.update(user.getId(), user);
    }

    @Override
    public void deleteAccount(String username)
    {
        User user = userService.getByUsername(username);
        user.setIs_deleted(Boolean.TRUE);
        userService.update(user.getId(), user);
    }

    @Override
    public void restoreAccount(String username)
    {
        User user = userService.getByUsername(username);
        user.setIs_deleted(Boolean.FALSE);
        userService.update(user.getId(), user);
    }

    private boolean compareValues(String initialValue, String specifiedValue)
    {
        return initialValue.equals(specifiedValue);
    }
}
