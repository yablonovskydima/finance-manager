package com.finace.manager.requests.validation;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import org.springframework.stereotype.Component;

@Component
public class UserUniqueFieldsValidator implements ConstraintValidator<UserUniqueFields, Object>
{

    @Override
    public void initialize(UserUniqueFields constraintAnnotation) {
        ConstraintValidator.super.initialize(constraintAnnotation);
    }

    @Override
    public boolean isValid(Object object, ConstraintValidatorContext constraintValidatorContext) {
        return false;
    }
}
