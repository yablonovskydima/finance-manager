package com.finace.manager.requests.security;


import com.finace.manager.requests.validation.OnCreate;
import com.finace.manager.requests.validation.PasswordConfirm;
import com.finace.manager.requests.validation.UserUniqueFields;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import org.hibernate.validator.constraints.Length;

@PasswordConfirm(groups = OnCreate.class)
public class SignUpRequest
{
    @NotBlank(message = "Username can not be empty.",
            groups = OnCreate.class)
    @Length(max = 20,
            message = "Username must be 20 characters or less.",
            groups = OnCreate.class)
    @UserUniqueFields(name = "username", message = "Username is already taken",
            groups = OnCreate.class)
    @Pattern(regexp = "^[A-Za-z0-9]{5,}$", message = "Invalid format")
    private String login;
    private String email;
    private String password;
    private String confirmPassword;
}
