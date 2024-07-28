package com.finace.manager.controllers;

import com.finace.manager.dto.TransactionDTO;
import com.finace.manager.entities.Transaction;
import com.finace.manager.mappers.TransactionMapper;
import com.finace.manager.requests.ReportRequest;
import com.finace.manager.requests.security.services.TransactionService;
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
    private final TransactionMapper transactionMapper;

    @Autowired
    public TransactionController(TransactionService transactionService, TransactionMapper transactionMapper) {
        this.transactionService = transactionService;
        this.transactionMapper = transactionMapper;
    }

    @GetMapping
    public ResponseEntity<List<TransactionDTO>> getAll()
    {
        List<Transaction> transactions = transactionService.getAll();
        List<TransactionDTO> transactionDTOS = transactions.stream().map(transactionMapper::toDTO).toList();
        return ResponseEntity.ok(transactionDTOS);
    }

    @GetMapping("/users")
    public ResponseEntity<List<TransactionDTO>> getAllByOwnerUsername(@RequestParam("username") String username)
    {
        List<Transaction> transactions = transactionService.getAllByOwnerUsername(username);
        List<TransactionDTO> transactionDTOS = transactions.stream().map(transactionMapper::toDTO).toList();
        return ResponseEntity.ok(transactionDTOS);
    }

    @PostMapping("/report")
    public ResponseEntity<List<TransactionDTO>> getByFilter(@RequestBody ReportRequest request)
    {
        List<Transaction> transactions = transactionService.getByFilter(request);
        List<TransactionDTO> transactionDTOS = transactions.stream().map(transactionMapper::toDTO).toList();
        return ResponseEntity.ok(transactionDTOS);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TransactionDTO> getTransactionById(@PathVariable Long id)
    {
        return ResponseEntity.ok(transactionMapper.toDTO(transactionService.getById(id).orElseThrow()));
    }

    @PostMapping
    public ResponseEntity<TransactionDTO> createTransactions(@RequestBody Transaction transaction, UriComponentsBuilder uriComponentsBuilder)
    {
        TransactionDTO created = transactionMapper.toDTO(transactionService.create(transaction));
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
