package com.finace.manager.services;

import com.finace.manager.entities.Category;
import com.finace.manager.exeptions.ResourceNotFoundException;
import com.finace.manager.repositories.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryService implements CRUDInterface<Category, Long>
{

    private final CategoryRepository categoryRepository;

    @Autowired
    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @Override
    public Category create(Category category)
    {
        return categoryRepository.save(category);
    }

    @Override
    public List<Category> getAll()
    {
        return categoryRepository.findAll();
    }

    @Override
    public Optional<Category> getById(Long id)
    {
        return categoryRepository.findById(id);
    }

    @Override
    public Category update(Long id, Category category)
    {
        category.setId(id);
        return categoryRepository.save(category);
    }

    @Override
    public void delete(Category e)
    {
        categoryRepository.delete(e);
    }

    @Override
    public void deleteById(Long id)
    {
        delete(getCategoryByIdOrThrow(id));
    }


    Category getCategoryByIdOrThrow(Long id)
    {
        return getById(id).orElseThrow(() -> {return new ResourceNotFoundException("Category is not found");});
    }
}
