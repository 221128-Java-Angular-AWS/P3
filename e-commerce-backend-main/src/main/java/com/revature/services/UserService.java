package com.revature.services;

import com.revature.exceptions.EmailTakenException;
import com.revature.models.User;
import com.revature.repositories.UserRepository;

import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User save(User user) {
        return userRepository.save(user);
    }

    public User getUser(Integer userId){
        return userRepository.findByUserId(userId);
    }

    public Optional<User> getUser(String email){
        return userRepository.findByEmail(email);
    }
    
    public User save(int userId, User user){
        user.setId(userId);
        User currentUser = this.findById(userId).get();

        if (user.getEmail() != null) {
            Optional<User> emailCheck = userRepository.findByEmail(user.getEmail());
            if (emailCheck.isPresent()) {
                if (user.getId() != emailCheck.get().getId()) {
                    throw new EmailTakenException("That email is already in use.");
                }
            }
        }
        // ensure the request is not nulling fields
        if (user.getEmail() == null || user.getEmail().equals("")) {
            user.setEmail(currentUser.getEmail());
        }
        if (user.getPassword() == null || user.getPassword().equals("")) {
            user.setPassword(currentUser.getPassword());
        }
        if (user.getFirstName() == null || user.getFirstName().equals("")) {
            user.setFirstName(currentUser.getFirstName());
        }
        if (user.getLastName() == null || user.getLastName().equals("")) {
            user.setLastName(currentUser.getLastName());
        }
        return userRepository.save(user);
    }

    public Optional<User> findById(int userId) {
        Optional<User> optional = userRepository.findById(userId);
        if (optional.isPresent()) {
            User user = optional.get();
            return Optional.of(user);
        }
        return optional;
    }

}
