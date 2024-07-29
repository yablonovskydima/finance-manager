package com.finance.manager.exeptions;

import java.util.HashMap;
import java.util.Map;

public class ExceptionBodyImpl implements ExceptionBody
{
    private String message;
    private Map<String, String> errors;

    public ExceptionBodyImpl() {
        this.errors = new HashMap<>();
    }

    public ExceptionBodyImpl(String message, Map<String, String> errors) {
        this.message = message;
        this.errors = errors;
    }

    @Override
    public String getMessage() {
        return message;
    }

    @Override
    public void setMessage(String message) {
        this.message = message;
    }

    @Override
    public void appendError(String key, String value) {
        errors.put(key,value);
    }

    @Override
    public void removeError(String key) {
        errors.remove(key);
    }

    @Override
    public void setErrors(Map<String, String> errors) {
        this.errors.putAll(errors);
    }

    @Override
    public Map<String, String> getErrors() {
        return errors;
    }
}
