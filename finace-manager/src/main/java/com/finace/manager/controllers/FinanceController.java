package com.finace.manager.controllers;

import com.finace.manager.dto.FinanceDTO;
import com.finace.manager.entities.Finance;
import com.finace.manager.exeptions.ResourceNotFoundException;
import com.finace.manager.mappers.FinanceMapper;
import com.finace.manager.services.FinanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.List;

@RestController
@RequestMapping("/finances")
public class FinanceController
{
    private final FinanceService financeService;
    private final FinanceMapper financeMapper;

    @Autowired
    public FinanceController(FinanceService financeService, FinanceMapper financeMapper) {
        this.financeService = financeService;
        this.financeMapper = financeMapper;
    }

    @GetMapping
    public ResponseEntity<List<FinanceDTO>> getAll()
    {
        List<Finance> finances = financeService.getAll();
        List<FinanceDTO> financeDTOS = finances.stream().map(financeMapper::toDTO).toList();
        return ResponseEntity.ok(financeDTOS);
    }

    @GetMapping("/users")
    public ResponseEntity<List<FinanceDTO>> getAllByOwnerUsername(@RequestParam("username") String username)
    {
        List<Finance> finances = financeService.getAllByOwnerUsername(username);
        List<FinanceDTO> financeDTOS = finances.stream().map(financeMapper::toDTO).toList();
        return ResponseEntity.ok(financeDTOS);
    }

    @GetMapping("/{id}")
    public ResponseEntity<FinanceDTO> getCategoryById(@PathVariable Long id)
    {
        return ResponseEntity.ok(financeMapper.toDTO(financeService.getById(id).orElseThrow()));
    }

    @PostMapping
    public ResponseEntity<FinanceDTO> createCategory(@RequestBody Finance finance, UriComponentsBuilder uriComponentsBuilder)
    {
        FinanceDTO created = financeMapper.toDTO(financeService.create(finance));
        return ResponseEntity.created(uriComponentsBuilder.path("/categories/{id}")
                .build(created.getId())).body(created);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateCategory(@RequestBody Finance newFinance, @PathVariable Long id)
    {
        financeService.update(id, newFinance);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCategory(@PathVariable Long id)
    {
        financeService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
