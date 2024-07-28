package com.finace.manager.repositories;

import com.finace.manager.entities.Finance;
import com.finace.manager.entities.Transaction;
import com.finace.manager.requests.ReportRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long>
{
    @Query("""
            SELECT transaction FROM Transaction transaction
            WHERE (:#{#filter.from} IS NULL OR transaction.date >= :#{#filter.from})
            AND (:#{#filter.to} IS NULL OR transaction.date <= :#{#filter.to})
            AND (:#{#filter.transactionType}  IS NULL OR transaction.transactionType = :#{#filter.transactionType})
            AND (:#{#filter.financeCategoryName}  IS NULL OR transaction.financeCategory.type = :#{#filter.financeCategoryName})
            AND (:#{#filter.ownerUsername}  IS NULL OR transaction.owner.username = :#{#filter.ownerUsername})
            """)
    List<Transaction> findAllByFilter(@Param("filter") ReportRequest filter);

    @Query("""
            SELECT transaction FROM Transaction transaction
            WHERE (transaction.owner.username = :#{#username})
            """)
    List<Transaction> findAllByOwnerUsername(@Param("username") String username);
}