package com.revature.controllers;

import com.revature.advice.AuthAspect;
import com.revature.annotations.Authorized;
import com.revature.exceptions.EmailTakenException;
import com.revature.models.User;
import com.revature.services.OrderService;
import com.revature.services.ReviewService;
import com.revature.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.util.Optional;

@RestController
@RequestMapping("/profile")
@CrossOrigin(origins = {"http://localhost:4200", "http://localhost:3000", "http://p3-static-hosting.s3-website.us-east-2.amazonaws.com"}, allowCredentials = "true", exposedHeaders = "Authorization")
public class ProfileController {

    private final UserService userService;
    // need a wishlist service as well

    @Autowired
    public ProfileController(UserService userService, ReviewService reviewService, OrderService orderService) {
        this.userService = userService;
    }

    @Authorized
    @GetMapping
    public ResponseEntity<User> getUserInfo(HttpSession session) {
        User loggedInUser = (User) session.getAttribute("user");
        int userId = loggedInUser.getId();
        Optional<User> optional = userService.findById(userId);


        if (!optional.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        // need to either update this or add more to get user orders, reviews, and wishlist
        return ResponseEntity.ok(optional.get());
    }

    @Authorized
    @PostMapping()
    public ResponseEntity<User> postUserInfo(HttpSession session, @RequestBody User user) {
        User loggedInUser = (User) session.getAttribute("user");
        int userId = loggedInUser.getId();
        try {
            user = userService.save(userId, user);
        } catch(EmailTakenException e) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(user);
    }

}
