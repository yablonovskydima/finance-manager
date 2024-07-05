package com.finace.manager.controllers;

import com.finace.manager.entities.Category;
import com.finace.manager.services.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.List;

@RestController
@RequestMapping("/categories")
public class CategoryController
{
    private final CategoryService categoryService;

    @Autowired
    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping
    public ResponseEntity<List<Category>> getAll()
    {
        return ResponseEntity.ok(categoryService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Category> getCategoryById(@PathVariable Long id)
    {
        return ResponseEntity.of(categoryService.getById(id));
    }

    @PostMapping
    public ResponseEntity<Category> createCategory(@RequestBody Category category, UriComponentsBuilder uriComponentsBuilder)
    {
        Category created = categoryService.create(category);
        return ResponseEntity.created(uriComponentsBuilder.path("/categories/{id}")
                .build(created.getId())).body(created);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateCategory(@RequestBody Category newCategory, @PathVariable Long id)
    {
        categoryService.update(id, newCategory);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCategory(@PathVariable Long id)
    {
        categoryService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
