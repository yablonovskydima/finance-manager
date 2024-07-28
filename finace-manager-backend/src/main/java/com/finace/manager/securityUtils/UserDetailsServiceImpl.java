package com.finace.manager.securityUtils;

import com.finace.manager.entities.User;
import com.finace.manager.requests.security.services.UserService;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

public class UserDetailsServiceImpl implements UserDetailsService
{
    private final UserService userService;

    public UserDetailsServiceImpl(UserService userService) {
        this.userService = userService;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userService.getByUsername(username);
        JwtEntity jwtEntity = new JwtEntity();
        jwtEntity.setUser(user);
        return jwtEntity;
    }

}
