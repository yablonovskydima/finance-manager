package com.finace.manager.requests.security;


import com.fasterxml.jackson.annotation.JsonProperty;
import com.finace.manager.requests.validation.OnCreate;
import com.finace.manager.requests.validation.OnUpdate;
import com.finace.manager.requests.validation.PasswordConfirm;
import com.finace.manager.requests.validation.UserUniqueFields;
import jakarta.validation.constraints.Email;
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

    @NotBlank(message = "Email cannot be empty.",
            groups = OnCreate.class)
    @Email(message = "Incorrect email.",
            groups = OnCreate.class)
    @Length(max = 50,
            message = "Email must be 50 characters or less.",
            groups = {OnCreate.class, OnUpdate.class})
    @UserUniqueFields(name = "email", message = "Email is already taken",
            groups = OnCreate.class)
    @Pattern(regexp = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,6}$",
            message = "Invalid format")
    private String email;

    @NotBlank(message = "Password cannot be empty.", groups = OnCreate.class)
    @Pattern(regexp = "^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!?@#$%^&*(),\\.<>\\[\\]{}\"'|\\\\:;`~+\\-*\\/]).{8,}$",
            message = "Invalid password format.",
            groups = {OnCreate.class, OnUpdate.class})
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;

    @NotBlank(message = "Password confirm can not be null.",
            groups = OnCreate.class)
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String confirmPassword;

    public SignUpRequest(String login, String email, String password, String confirmPassword) {
        this.login = login;
        this.email = email;
        this.password = password;
        this.confirmPassword = confirmPassword;
    }

    public SignUpRequest() {
    }

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getConfirmPassword() {
        return confirmPassword;
    }

    public void setConfirmPassword(String confirmPassword) {
        this.confirmPassword = confirmPassword;
    }
}
