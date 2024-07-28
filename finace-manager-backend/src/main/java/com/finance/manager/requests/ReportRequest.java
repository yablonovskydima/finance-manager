package com.finance.manager.requests;

import java.time.LocalDateTime;
import java.util.Date;

public class ReportRequest
{
    private Date from;
    private Date to;
    private String transactionType;
    private String financeCategoryName;
    private String ownerUsername;

    public ReportRequest(Date from, Date to, String transactionType, String financeCategoryName, String ownerUsername) {
        this.from = from;
        this.to = to;
        this.transactionType = transactionType;
        this.financeCategoryName = financeCategoryName;
        this.ownerUsername = ownerUsername;
    }

    public ReportRequest() {
    }

    public Date getFrom() {
        return from;
    }

    public void setFrom(Date from) {
        this.from = from;
    }

    public Date getTo() {
        return to;
    }

    public void setTo(Date to) {
        this.to = to;
    }

    public String getTransactionType() {
        return transactionType;
    }

    public void setTransactionType(String transactionType) {
        this.transactionType = transactionType;
    }

    public String getFinanceCategoryName() {
        return financeCategoryName;
    }

    public void setFinanceCategoryName(String financeCategoryName) {
        this.financeCategoryName = financeCategoryName;
    }

    public String getOwnerUsername() {
        return ownerUsername;
    }

    public void setOwnerUsername(String ownerUsername) {
        this.ownerUsername = ownerUsername;
    }
}
