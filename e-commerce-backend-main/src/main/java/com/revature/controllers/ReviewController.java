package com.revature.controllers;

import com.revature.annotations.Authorized;
import com.revature.dtos.OrderDto;
import com.revature.models.Product;
import com.revature.models.Review;
import com.revature.models.User;
import com.revature.services.ProductService;
import com.revature.services.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;

import javax.servlet.http.HttpSession;
import javax.transaction.Transactional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.*;
import com.revature.annotations.Authorized;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/review")
@CrossOrigin(origins = {"http://localhost:4200", "http://localhost:3000"}, allowCredentials = "true")
@Transactional
public class ReviewController {
    private final ReviewService reviewService;
    private final ProductService productService;

    @Autowired
    public ReviewController(ReviewService reviewService, ProductService productService) {
        this.reviewService = reviewService;
        this.productService = productService;
    }

    /*@Authorized
    @GetMapping
    public ResponseEntity<List<Review>> getReviews() { return ResponseEntity.ok(reviewService.getAll());}

     */


    @PostMapping(value = "/add")
    @Authorized
    public ResponseEntity<Review> postReview(HttpSession session, @RequestBody Review review) {
        System.out.println("In Controller!:"+ session.getAttribute("user"));
        review.setUser((User)session.getAttribute("user"));
        return ResponseEntity.ok(reviewService.saveReview(review));
    }

    @GetMapping(value = "/{productId}")
    @Authorized
    public Review hasReviewed(HttpSession session, @PathVariable("productId") int productId) {
        Integer userId = ((User)session.getAttribute("user")).getId();
        return reviewService.getReview(userId, productId);
    }

    @GetMapping(value = "/ping")
    //@Authorized
    public String ping(HttpSession session) {
        System.out.println("poncceita");
        return "Ponnc";
    }

}
