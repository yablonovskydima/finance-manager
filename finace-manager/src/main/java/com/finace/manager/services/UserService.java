package com.finace.manager.services;

import com.finace.manager.entities.User;
import com.finace.manager.exeptions.ResourceNotFoundException;
import com.finace.manager.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService implements CRUDInterface<User, Long>
{
    @Autowired
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository)
    {
        this.userRepository = userRepository;
    }


    @Override
    public User create(User user)
    {
        return userRepository.save(user);
    }

    @Override
    public List<User> getAll() {
        return userRepository.findAll();
    }

    @Override
    public Optional<User> getById(Long id)
    {
        return userRepository.findById(id);
    }

    @Override
    public User update(Long id, User user)
    {
        user.setId(id);
        return userRepository.save(user);
    }

    @Override
    public void delete(User user) {
        userRepository.delete(user);
    }

    @Override
    public void deleteById(Long id) {
        delete(getUserOrThrow(id));
    }

    public User getByUsername(String username)
    {
        return userRepository.findByUsername(username).orElseThrow(() -> {return  new ResourceNotFoundException("User is not found");});
    }

    public User getByEmail(String email)
    {
        return userRepository.findByEmail(email).orElseThrow(() -> {return  new ResourceNotFoundException("User is not found");});
    }

    User getUserOrThrow(Long id)
    {
        return getById(id).orElseThrow(() -> {return  new ResourceNotFoundException("User is not found");});
    }
}
