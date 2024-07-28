package com.finace.manager.entities;

import jakarta.persistence.*;
import org.hibernate.annotations.Check;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.Date;

@Entity
@Table(
        name = "transactions",
        uniqueConstraints = {
            @UniqueConstraint(columnNames = "finance_id", name = "fk_finance_transaction")
        }
)
public class Transaction
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @ManyToOne()
    @JoinColumn(name = "finance_id", foreignKey = @ForeignKey(name = "fk_finance_transaction"))
    private Finance financeCategory;

    @Column(name = "transaction_type", nullable = false, length = 100)
    private String transactionType;

    @Column(name = "transaction_sum", nullable = false)
    @Check(constraints = "transaction_sum >= 0")
    private Double transactionSum;

    @Column(name = "transaction_date", nullable = false)
    private Date date;

    @Column(name = "description", nullable = false, length = 150)
    private String description;

    public Transaction(Long id, Finance financeCategory, String transactionType, Double transactionSum, Date date, String description) {
        this.id = id;
        this.financeCategory = financeCategory;
        this.transactionType = transactionType;
        this.transactionSum = transactionSum;
        this.date = date;
        this.description = description;
    }

    public Transaction() {
        financeCategory = new Finance();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Finance getFinanceCategory() {
        return financeCategory;
    }

    public void setFinanceCategory(Finance financeCategory) {
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
}
