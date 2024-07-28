package com.finace.manager.requests.validation;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import org.hibernate.annotations.Comment;
import org.springframework.beans.BeanWrapperImpl;
import org.springframework.stereotype.Component;

@Component
public class PasswordConfirmValidator implements ConstraintValidator<PasswordConfirm, Object>
{

    private String password;
    private String passwordConfirm;
    private String message;

    @Override
    public void initialize(PasswordConfirm passwordConfirm) {
        this.password = passwordConfirm.password();
        this.passwordConfirm = passwordConfirm.confirmPassword();
        this.message = passwordConfirm.message();
    }

    @Override
    public boolean isValid(Object object, ConstraintValidatorContext constraintValidatorContext)
    {
        if (object == null)
        {
            return false;
        }

        Object passwordValue = new BeanWrapperImpl(object).getPropertyValue(password);
        Object passwordConfirmValue = new BeanWrapperImpl(object).getPropertyValue(passwordConfirm);

        boolean isValid = (passwordValue != null && passwordConfirmValue.equals(passwordValue)) || (passwordValue == null && passwordConfirmValue == null);

        if (!isValid)
        {
            constraintValidatorContext.disableDefaultConstraintViolation();
            constraintValidatorContext.buildConstraintViolationWithTemplate(message)
                    .addPropertyNode("confirmPassword")
                    .addConstraintViolation();
            return false;
        }
        return true;
    }
}
