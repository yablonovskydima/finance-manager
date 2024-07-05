package com.finace.manager.controllers;

import com.finace.manager.dto.Test;
import com.finace.manager.entities.Transaction;
import com.finace.manager.requests.ReportRequest;
import com.finace.manager.services.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.List;

@RestController
@RequestMapping("/transactions")
public class TransactionController
{
    private final TransactionService transactionService;

    @Autowired
    public TransactionController(TransactionService transactionService) {
        this.transactionService = transactionService;
    }

    @GetMapping
    public ResponseEntity<List<Transaction>> getAll()
    {
        return ResponseEntity.ok(transactionService.getAll());
    }

    @PostMapping("/report")
    public ResponseEntity<List<Transaction>> getByFilter(@RequestBody ReportRequest request)
    {
        return ResponseEntity.ok(transactionService.getByFilter(request));
    }

    @PostMapping("/test")
    public ResponseEntity<?> test(@RequestBody Test test)
    {
        Test created = test;
        return ResponseEntity.ok(created);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Transaction> getTransactionById(@PathVariable Long id)
    {
        return ResponseEntity.of(transactionService.getById(id));
    }

    @PostMapping
    public ResponseEntity<Transaction> createTransactions(@RequestBody Transaction transaction, UriComponentsBuilder uriComponentsBuilder)
    {
        Transaction created = transactionService.create(transaction);
        return ResponseEntity.created(uriComponentsBuilder.path("/transactions/{id}")
                .build(created.getId())).body(created);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Transaction> updateTransaction(@RequestBody Transaction transaction, @PathVariable Long id)
    {
        transactionService.update(id, transaction);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Transaction> deleteTransaction(@PathVariable Long id)
    {
        transactionService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
