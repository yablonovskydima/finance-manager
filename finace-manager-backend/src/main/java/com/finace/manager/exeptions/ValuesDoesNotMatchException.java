package com.finace.manager.exeptions;

public class ValuesDoesNotMatchException extends RuntimeException
{
    public ValuesDoesNotMatchException() {
        super();
    }

    public ValuesDoesNotMatchException(String message) {
        super(message);
    }
}
