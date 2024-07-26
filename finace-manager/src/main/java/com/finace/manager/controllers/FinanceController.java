package com.finace.manager.controllers;

import com.finace.manager.entities.Finance;
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

    @Autowired
    public FinanceController(FinanceService financeService) {
        this.financeService = financeService;
    }

    @GetMapping
    public ResponseEntity<List<Finance>> getAll()
    {
        return ResponseEntity.ok(financeService.getAll());
    }

    @GetMapping("/users")
    public ResponseEntity<List<Finance>> getAllByOwnerUsername(@RequestParam("username") String username)
    {
        return ResponseEntity.ok(financeService.getAllByOwnerUsername(username));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Finance> getCategoryById(@PathVariable Long id)
    {
        return ResponseEntity.of(financeService.getById(id));
    }

    @PostMapping
    public ResponseEntity<Finance> createCategory(@RequestBody Finance finance, UriComponentsBuilder uriComponentsBuilder)
    {
        Finance created = financeService.create(finance);
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
