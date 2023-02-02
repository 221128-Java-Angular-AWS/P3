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
import java.util.Optional;

@RestController
@RequestMapping("/wishlist")
@CrossOrigin(origins = {"http://localhost:4200", "http://localhost:3000", "http://p3-static-hosting.s3-website.us-east-2.amazonaws.com"}, allowCredentials = "true")
public class WishListController {

    private final WishListService wishListService;
    private final ProductService productService;

    public WishListController(WishListService wishListService, ProductService productService) {
        this.wishListService = wishListService;
        this.productService = productService;
    }

//    @Authorized
    @GetMapping("/{user_id}")
    public ResponseEntity<List<Product>> getWishList(@PathVariable("user_id") int userId, HttpSession session) {
        return ResponseEntity.ok(wishListService.getWishList(userId));
    }

//    @Authorized
    @DeleteMapping("/{user_id}/{product_id}")
    public ResponseEntity<WishList> deleteWishListItem(@PathVariable("user_id") int userID, @PathVariable("product_id") int productID) {
        Optional<WishList> optional = wishListService.findByUserAndProduct(userID, productID);

        if(!optional.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        wishListService.deleteWishListItem(optional.get().getId());

        return ResponseEntity.ok(optional.get());
    }
}
