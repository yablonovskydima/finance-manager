package com.finace.manager.requests.validation;

import com.finace.manager.entities.User;
import com.finace.manager.services.UserService;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class UserUniqueFieldsValidator implements ConstraintValidator<UserUniqueFields, Object>
{
    @Autowired
    private UserService userService;

    private String field;
    @Override
    public void initialize(UserUniqueFields constraintAnnotation) {
        this.field = constraintAnnotation.name();
    }

    @Override
    public boolean isValid(Object object, ConstraintValidatorContext constraintValidatorContext)
    {
        if (object == null)
        {
            return true;
        }

        String fieldValue = (String) object;
        return switch (field)
        {
            case "username" -> getByUsername(fieldValue).isEmpty();
            case "email" -> getByEmail(fieldValue).isEmpty();
            default -> true;
        };
    }

    private Optional<User> getByUsername(String username)
    {
        try {
            return Optional.ofNullable(userService.getByUsername(username));
        }
        catch (Exception e)
        {
            return Optional.empty();
        }
    }

    private Optional<User> getByEmail(String email)
    {
        try {
            return Optional.ofNullable(userService.getByEmail(email));
        }
        catch (Exception e)
        {
            return Optional.empty();
        }
    }
}
