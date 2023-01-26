package com.revature.controllers;

import com.revature.annotations.Authorized;
import com.revature.dtos.LoginRequest;
import com.revature.models.WishList;
import com.revature.services.ProductService;
import com.revature.models.Product;
import com.revature.services.WishListService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import javax.servlet.http.HttpSession;
import java.util.Enumeration;
import java.util.List;

@RestController
@RequestMapping("/wishlist")
@CrossOrigin(origins = {"http://localhost:4200", "http://localhost:3000"}, allowCredentials = "true")
public class WishListController {

    private final WishListService wishListService;
    private final ProductService productService;

    public WishListController(WishListService wishListService, ProductService productService) {
        this.wishListService = wishListService;
        this.productService = productService;
    }

//    @Authorized
    @GetMapping
    public ResponseEntity<List<Product>> getWishList(HttpSession session) {
        return ResponseEntity.ok(wishListService.getWishList());
    }
}
