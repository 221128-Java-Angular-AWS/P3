package com.revature.services;

import com.revature.models.User;
import com.revature.repositories.UserRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public Optional<User> findByCredentials(String email, String password) {
        return userRepository.findByEmailAndPassword(email, password);
    }

    public User save(User user) {
        return userRepository.save(user);
    }

    public User save(int userId, User user){
        user.setId(userId);
        User currentUser = this.findById(userId).get();
        // ensure the request is not nulling fields
        if (user.getEmail() == null) {
            user.setEmail(currentUser.getEmail());
        }
        if (user.getPassword() == null || user.getPassword() == "") {
            user.setPassword(currentUser.getPassword());
        }
        if (user.getFirstName() == null) {
            user.setFirstName(currentUser.getFirstName());
        }
        if (user.getLastName() == null) {
            user.setLastName(currentUser.getLastName());
        }
        // TODO: remove password before return for security reasons or do below
        return userRepository.save(user); // TODO: maybe change this so that password changes are their own entity
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
