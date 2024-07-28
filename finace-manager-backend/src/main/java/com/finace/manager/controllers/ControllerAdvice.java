package com.finace.manager.controllers;

import com.finace.manager.exeptions.AccessDeniedException;
import com.finace.manager.exeptions.ExceptionBody;
import com.finace.manager.exeptions.ExceptionBodyImpl;
import com.finace.manager.exeptions.UserAccountStateException;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.validation.ConstraintViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.validation.ObjectError;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.client.HttpStatusCodeException;
import org.springframework.web.servlet.resource.NoResourceFoundException;

import java.lang.reflect.InvocationTargetException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;

@RestControllerAdvice
public class ControllerAdvice
{
    @ExceptionHandler(value = {
            NoResourceFoundException.class,
            UsernameNotFoundException.class
    })
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ExceptionBody handleResourceNotFound(
            Exception e
    )
    {
        return new ExceptionBodyImpl(e.getMessage(), new HashMap<>());
    }

    @ExceptionHandler(HttpRequestMethodNotSupportedException.class)
    @ResponseStatus(HttpStatus.METHOD_NOT_ALLOWED)
    public ExceptionBody handleHttpRequestMethodNotSupported(
            HttpRequestMethodNotSupportedException e
    )
    {
        return new ExceptionBodyImpl(e.getMessage(), new HashMap<>());
    }

    @ExceptionHandler(HttpStatusCodeException.class)
    public ResponseEntity<ExceptionBody> handleHttpStatusCodeException(
            HttpStatusCodeException e
    )
    {
        return ResponseEntity.status(e.getStatusCode()).body(new ExceptionBodyImpl(e.getMessage(), new HashMap<>()));
    }

    @ExceptionHandler({
            IllegalArgumentException.class,
            IllegalStateException.class,
            InvocationTargetException.class
    })
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ExceptionBody handleBadRequest(
            Exception e
    )
    {
        return new ExceptionBodyImpl(e.getMessage(), new HashMap<>());
    }


    @ExceptionHandler(ConstraintViolationException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ExceptionBody handleConstraintViolationException(ConstraintViolationException ex)
    {
        ExceptionBody exceptionBody = new ExceptionBodyImpl();
        ex.getConstraintViolations().forEach(violation -> {
            exceptionBody.appendError(violation.getPropertyPath().toString(), violation.getMessage());
        });
        return exceptionBody;
    }

    @ExceptionHandler({
            AccessDeniedException.class,
            org.springframework.security.access.AccessDeniedException.class
    })
    @ResponseStatus(HttpStatus.FORBIDDEN)
    public ExceptionBody handleAccessDenied(
            Exception e
    )
    {
        if (e instanceof AccessDeniedException) {
            return new ExceptionBodyImpl("Access denied.", new HashMap<>());
        } else if (e instanceof org.springframework.security.access.AccessDeniedException) {
            return new ExceptionBodyImpl(e.getMessage(), new HashMap<>());
        }
        return new ExceptionBodyImpl("Access denied", new HashMap<>());
    }

    @ExceptionHandler(UserAccountStateException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    public ExceptionBodyImpl handleUserAccountStateException(
            UserAccountStateException e
    )
    {
        return new ExceptionBodyImpl(e.getMessage(), new HashMap<>());
    }

    @ExceptionHandler(AuthenticationException.class)
    @ResponseStatus(HttpStatus.FORBIDDEN)
    public ExceptionBody handleAuthentication(final AuthenticationException e)
    {
        return new ExceptionBodyImpl("Authentication failed", new HashMap<>());
    }

    @ExceptionHandler(ExpiredJwtException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    public ExceptionBody handleExpiredJwtException(
            ExpiredJwtException e
    )
    {
        return new ExceptionBodyImpl("JWT expired", new HashMap<>());
    }

    @ExceptionHandler({
            Throwable.class
    })
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public ExceptionBody handleResourceNotFound(Throwable throwable)
    {
        return new ExceptionBodyImpl(throwable.getMessage(), new HashMap<>());
    }
}
