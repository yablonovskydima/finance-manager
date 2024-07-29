package com.finance.manager.dto;

import java.util.Date;

public class TransactionDTO
{
    private Long id;
    private FinanceDTO financeCategory;
    private String transactionType;
    private Double transactionSum;
    private Date date;
    private String description;
    private UserDTO owner;

    public TransactionDTO(Long id, FinanceDTO financeCategory, String transactionType, Double transactionSum, Date date, String description, UserDTO owner) {
        this.id = id;
        this.financeCategory = financeCategory;
        this.transactionType = transactionType;
        this.transactionSum = transactionSum;
        this.date = date;
        this.description = description;
        this.owner = owner;
    }

    public TransactionDTO() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public FinanceDTO getFinanceCategory() {
        return financeCategory;
    }

    public void setFinanceCategory(FinanceDTO financeCategory) {
        this.financeCategory = financeCategory;
    }

    public String getTransactionType() {
        return transactionType;
    }

    public void setTransactionType(String transactionType) {
        this.transactionType = transactionType;
    }

    public Double getTransactionSum() {
        return transactionSum;
    }

    public void setTransactionSum(Double transactionSum) {
        this.transactionSum = transactionSum;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public UserDTO getOwner() {
        return owner;
    }

    public void setOwner(UserDTO owner) {
        this.owner = owner;
    }
}
