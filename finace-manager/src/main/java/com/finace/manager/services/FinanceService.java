package com.finace.manager.services;

import com.finace.manager.entities.Finance;
import com.finace.manager.entities.User;
import com.finace.manager.exeptions.ResourceNotFoundException;
import com.finace.manager.repositories.FinanceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FinanceService implements CRUDInterface<Finance, Long>
{

    private final FinanceRepository financeRepository;
    private final UserService userService;

    @Autowired
    public FinanceService(FinanceRepository financeRepository, UserService userService) {
        this.financeRepository = financeRepository;
        this.userService = userService;
    }

    @Override
    public Finance create(Finance category)
    {
        User user = userService.getByUsername(category.getOwner().getUsername());
        category.setOwner(user);
        return financeRepository.save(category);
    }

    @Override
    public List<Finance> getAll()
    {
        return financeRepository.findAll();
    }

    @Override
    public Optional<Finance> getById(Long id)
    {
        return financeRepository.findById(id);
    }

    @Override
    public Finance update(Long id, Finance category)
    {
        category.setId(id);
        return financeRepository.save(category);
    }

    @Override
    public void delete(Finance e)
    {
        financeRepository.delete(e);
    }

    @Override
    public void deleteById(Long id)
    {
        delete(getFinanceByIdOrThrow(id));
    }

    public List<Finance> getAllByOwnerUsername(String username)
    {
        return financeRepository.findAllByOwnerUsername(username);
    }


    Finance getFinanceByIdOrThrow(Long id)
    {
        return getById(id).orElseThrow(() -> {return new ResourceNotFoundException("Finance is not found");});
    }
}
