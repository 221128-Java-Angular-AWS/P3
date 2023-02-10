package com.revature.controllers;

import com.revature.dtos.LoginRequest;
import com.revature.dtos.RegisterRequest;
import com.revature.models.User;
import com.revature.services.AuthService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.util.Optional;

/**
 * The Auth controller handles HTTP requests sent to the /auth endpoint
 * handles requests related to login and registration
 */
@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = {"http://localhost:4200", "http://localhost:3000", "http://p3-static-hosting.s3-website.us-east-2.amazonaws.com"}, allowCredentials = "true", exposedHeaders = "Authorization")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    /**
     * This method handles Post requests sent to the /auth/login endpoint
     * Saves user info in the session if login is successful
     * @param loginRequest Contains the email and password of a user attempting to log in
     * @param session Contains information about the current session
     * @return ResponseEntity with the User object if login was successful
     */
    @PostMapping("/login")
    public ResponseEntity<User> login(@RequestBody LoginRequest loginRequest, HttpSession session) {
        Optional<User> optional = authService.authenticateUser(loginRequest.getEmail(), loginRequest.getPassword());

        if(!optional.isPresent()) {
            return ResponseEntity.badRequest().build();
        }
        session.setAttribute("user", optional.get());
        return ResponseEntity.ok(optional.get());
    }

    /**
     * This method handles Post requests sent to the /auth/logout endpoint
     * Deletes user info from the current session
     * @param session Contains information about the current session
     * @return ResponseEntity to verify the request was successfully handled
     */
    @PostMapping("/logout")
    public ResponseEntity<Void> logout(HttpSession session) {
        session.removeAttribute("user");

        return ResponseEntity.ok().build();
    }

    /**
     * This method handles Post requests sent to the /auth/register endpoint
     * Creates a new user to be sent to the database
     * @param registerRequest Contains user-inputted informaiton about a new user
     * @return ResponseEntity with the newly created user
     */
    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody RegisterRequest registerRequest) {
        User created = new User(0,
                registerRequest.getEmail(),
                registerRequest.getPassword(),
                registerRequest.getFirstName(),
                registerRequest.getLastName());

        return ResponseEntity.status(HttpStatus.CREATED).body(authService.register(created));
    }
}
