package com.finace.manager.requests.security.services;

import com.finace.manager.entities.Transaction;
import com.finace.manager.entities.User;
import com.finace.manager.exeptions.ResourceNotFoundException;
import com.finace.manager.repositories.TransactionRepository;
import com.finace.manager.requests.ReportRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TransactionService implements CRUDInterface<Transaction, Long>
{
    private final TransactionRepository transactionRepository;
    private final UserService userService;

    @Autowired
    public TransactionService(TransactionRepository transactionRepository, UserService userService) {
        this.transactionRepository = transactionRepository;
        this.userService = userService;
    }


    @Override
    public Transaction create(Transaction transaction)
    {
        User user = userService.getByUsername(transaction.getOwner().getUsername());
        transaction.setOwner(user);
        return transactionRepository.save(transaction);
    }

    @Override
    public List<Transaction> getAll()
    {
        return transactionRepository.findAll();
    }

    @Override
    public Optional<Transaction> getById(Long id)
    {
        return transactionRepository.findById(id);
    }

    @Override
    public Transaction update(Long id, Transaction transaction)
    {
        transaction.setId(id);
        return transactionRepository.save(transaction);
    }

    @Override
    public void delete(Transaction transaction)
    {
        transactionRepository.delete(transaction);
    }

    @Override
    public void deleteById(Long id)
    {
        delete(getCategoryByIdOrThrow(id));
    }

    public List<Transaction> getAllByOwnerUsername(String username)
    {
        return transactionRepository.findAllByOwnerUsername(username);
    }

    Transaction getCategoryByIdOrThrow(Long id)
    {
        return getById(id).orElseThrow(() -> {return new ResourceNotFoundException("Category is not found");});
    }

    public List<Transaction> getByFilter(ReportRequest filter)
    {
        return transactionRepository.findAllByFilter(filter);
    }
}
