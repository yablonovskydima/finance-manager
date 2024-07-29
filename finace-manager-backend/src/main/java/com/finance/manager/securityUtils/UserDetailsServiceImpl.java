package com.finance.manager.securityUtils;

import com.finance.manager.entities.User;
import com.finance.manager.requests.security.services.UserService;
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
