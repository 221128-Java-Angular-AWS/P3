package com.revature.services;

import com.revature.models.User;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;

import java.util.Optional;

/**
 * Contains business logic necessary to handle requests related to authentication and registration
 */
@Service
public class AuthService {

    private final UserService userService;

    public AuthService(UserService userService) {
        this.userService = userService;
    }

    /**
     * Compares the provided email and password with data stored in the database to authenticate a user
     * @param email The email of the user attempting to log in
     * @param password The password to be compared with the user's password stored in the database
     * @return Optional object containing the user if authentication is successful
     */
    public Optional<User> authenticateUser(String email, String password){
        Optional<User> user = userService.getUser(email);
        if(user.isPresent() && BCrypt.checkpw(password, user.get().getPassword())){
            return user;
        }else{
            return Optional.empty();
        }
    }

    /**
     * Sends a new user to be persisted in the database
     * @param user The new user being registered
     * @return The user that was persisted in the database
     */
    public User register(User user) {
        return userService.save(user);
    }
}
