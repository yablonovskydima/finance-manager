package com.finace.manager.exeptions;

public class AccessDeniedException extends RuntimeException
{
    public AccessDeniedException() {
        super();
    }

    public AccessDeniedException(String message) {
        super(message);
    }
}
