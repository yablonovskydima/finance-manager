package com.finace.manager.dto;

public class Test
{
    private Double value;
    private ChildTest test;

    public Test(Double value, ChildTest test) {
        this.value = value;
        this.test = test;
    }

    public Test() {
    }

    public Double getValue() {
        return value;
    }

    public void setValue(Double value) {
        this.value = value;
    }

    public ChildTest getTest() {
        return test;
    }

    public void setTest(ChildTest test) {
        this.test = test;
    }
}
