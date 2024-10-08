package com.finace.manager.services;

import java.util.List;
import java.util.Optional;

public interface CRUDInterface <T, ID>
{
    T create(T e);
    List<T> getAll();
    Optional<T> getById(ID id);
    T update(ID id, T e);
    void delete(T e);

    void deleteById(Long id);
}
