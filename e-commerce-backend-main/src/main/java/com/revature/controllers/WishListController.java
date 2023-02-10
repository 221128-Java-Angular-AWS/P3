package com.revature.controllers;

import com.revature.annotations.Authorized;
import com.revature.models.User;
import com.revature.models.WishList;
import com.revature.services.ProductService;
import com.revature.models.Product;
import com.revature.services.WishListService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.util.List;
import java.util.Optional;

/**
 * The WishList controller handles HTTP requests sent to the /wishlist endpoint
 * Handles requests related to wishlists
 */

// NOTE: the term "WishList" is used inconsistently. "WishList" is used to refer to either a wishlisted item
// (a row in the wish_list table) OR to a list of wishlisted products (which is returned to the front-end).
// Check return values to see which definition is being used for a given function.

@RestController
@RequestMapping("/wishlist")
@CrossOrigin(origins = {"http://localhost:4200", "http://localhost:3000", "http://p3-static-hosting.s3-website.us-east-2.amazonaws.com"}, allowCredentials = "true", exposedHeaders = "Authorization")
public class WishListController {

    private final WishListService wishListService;
    private final ProductService productService;

    public WishListController(WishListService wishListService, ProductService productService) {
        this.wishListService = wishListService;
        this.productService = productService;
    }

    /**
     * This method handles Get requests sent to the /wishlist endpoint
     * Gets a list of products on the current user's wishlist
     * @param session Contains information about the current session
     * @return ResponseEntity with a list of products
     */

    @Authorized
    @GetMapping
    public ResponseEntity<List<Product>> getWishList(HttpSession session) {
        User user = (User) session.getAttribute("user");
        int userId = user.getId();
        return ResponseEntity.ok(wishListService.getWishList(userId));
    }

    /**
     * This method handles Get requests sent to the /wishlist/productId endpoint
     * Checks to see if an item is on the current user's wishlist
     * @param productId The ID of the product to be checked
     * @param session Contains information about the current session
     * @return ResponseEntity with a Boolean value indicating true if the item is on the wishlist
     */

    @Authorized
    @GetMapping("/{product_id}")
    public ResponseEntity<Boolean> checkIfWishListed(@PathVariable("product_id") int productId, HttpSession session) {
        User user = (User) session.getAttribute("user");
        int userId = user.getId();
        return ResponseEntity.ok(wishListService.checkIfWishListed(userId, productId));
    }


    /**
     * This method handles Post requests sent to the /wishlist endpoint
     * Adds an item to the current user's wishlist if not already present
     * @param productId The ID of the product to be added
     * @param session Contains information about the current session
     * @return ResponseEntity with an Integer of the added product's ID
     */
    @Authorized
    @PostMapping("/{product_id}")
    public ResponseEntity<Integer> addWishListItem(@PathVariable("product_id") int productId, HttpSession session) {
        User user = (User) session.getAttribute("user");
        int userId = user.getId();
        return ResponseEntity.ok(wishListService.addWishListItem(userId, productId));
    }
    /**
     * This method handles Delete requests sent to the /wishlist endpoint
     * Removes an item from the current user's wishlist
     * @param productId The ID of the product to be removed
     * @param session Contains information about the current session
     * @return ResponseEntity with the deleted WishList item
     */

    @Authorized
    @DeleteMapping("/{product_id}")
    public ResponseEntity<WishList> deleteWishListItem(@PathVariable("product_id") int productId, HttpSession session) {
        User user = (User) session.getAttribute("user");
        int userId = user.getId();

        Optional<WishList> optional = wishListService.findByUserAndProduct(userId, productId);

        if(!optional.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        wishListService.deleteWishListItem(optional.get().getId());

        return ResponseEntity.ok(optional.get());
    }
}
