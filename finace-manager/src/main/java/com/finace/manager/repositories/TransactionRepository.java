package com.finace.manager.repositories;

import com.finace.manager.entities.Category;
import com.finace.manager.entities.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {
}
