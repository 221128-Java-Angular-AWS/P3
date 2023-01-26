package com.revature.controllers;

import com.revature.advice.AuthAspect;
import com.revature.annotations.Authorized;
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
@CrossOrigin(origins = {"http://localhost:4200", "http://localhost:3000"}, allowCredentials = "true")
public class ProfileController {

    private final UserService userService;
    private final ReviewService reviewService;
    private final OrderService orderService;
    // need a wishlist service as well

    @Autowired
    public ProfileController(UserService userService, ReviewService reviewService, OrderService orderService) {
        this.userService = userService;
        this.reviewService = reviewService;
        this.orderService = orderService;
    }

    @Authorized
    @GetMapping
    public ResponseEntity<User> getUserInfo(HttpSession session) {
        // does this just work? Yes, yes it does
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
        return ResponseEntity.ok(userService.save(userId, user));
    }

}