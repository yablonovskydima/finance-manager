package com.finace.manager.entities;

import jakarta.persistence.*;
import org.hibernate.annotations.Check;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(
        name = "transactions",
        uniqueConstraints = {
            @UniqueConstraint(columnNames = "category_id")
        }
)
public class Transaction
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @OneToOne
    @JoinColumn(name = "category_id", foreignKey = @ForeignKey(name = "fk_category_transaction"))
    private Category category;

    @Column(name = "transaction_type", nullable = false, length = 100)
    private String transactionType;

    @Column(name = "transaction_sum", nullable = false)
    @Check(constraints = "transaction_sum >= 0")
    private Double transactionSum;

    @Column(name = "date", nullable = false)
    @CreationTimestamp
    private LocalDateTime date;

    @Column(name = "description", nullable = false, length = 150)
    private String description;

    public Transaction(Long id, Category category, String transactionType, Double transactionSum, LocalDateTime date, String description) {
        this.id = id;
        this.category = category;
        this.transactionType = transactionType;
        this.transactionSum = transactionSum;
        this.date = date;
        this.description = description;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public String getTransactionType() {
        return transactionType;
    }

    public void setTransactionType(String transactionType) {
        this.transactionType = transactionType;
    }

    public Double getSum() {
        return transactionSum;
    }

    public void setSum(Double transactionSum) {
        this.transactionSum = transactionSum;
    }

    public LocalDateTime getDate() {
        return date;
    }

    public void setDate(LocalDateTime date) {
        this.date = date;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
