package com.revature.controllers;

import com.revature.annotations.Authorized;
import com.revature.dtos.CartDto;
import com.revature.dtos.ProductInfo;
import com.revature.models.Cart;
import com.revature.models.Product;
import com.revature.models.User;
import com.revature.services.ProductService;
import com.revature.services.UserService;

import org.springframework.boot.context.config.UnsupportedConfigDataLocationException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

@RestController
@RequestMapping("/api/product")
@CrossOrigin(origins = {"http://localhost:4200", "http://localhost:3000"}, allowCredentials = "true")
@Transactional
public class ProductController {

    private final ProductService productService;
    private final UserService userService;
    public ProductController(ProductService productService, UserService userService) {
        this.productService = productService;
        this.userService = userService;
    }

    @Authorized
    @GetMapping
    public ResponseEntity<List<Product>> getInventory() {
        return ResponseEntity.ok(productService.findAll());
    }

    @Authorized
    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable("id") int id) {
        Optional<Product> optional = productService.findById(id);

        if(!optional.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(optional.get());
    }

    @Authorized
    @PutMapping
    public ResponseEntity<Product> upsert(@RequestBody Product product) {
        return ResponseEntity.ok(productService.save(product));
    }

    @Authorized
    @PatchMapping
    public ResponseEntity<List<Product>> purchase(@RequestBody List<ProductInfo> metadata) { 	
    	List<Product> productList = new ArrayList<Product>();
    	
    	for (int i = 0; i < metadata.size(); i++) {
    		Optional<Product> optional = productService.findById(metadata.get(i).getId());

    		if(!optional.isPresent()) {
    			return ResponseEntity.notFound().build();
    		}

    		Product product = optional.get();

    		if(product.getQuantity() - metadata.get(i).getQuantity() < 0) {
    			return ResponseEntity.badRequest().build();
    		}
    		
    		product.setQuantity(product.getQuantity() - metadata.get(i).getQuantity());
    		productList.add(product);
    	}
        
        productService.saveAll(productList, metadata);

        return ResponseEntity.ok(productList);
    }

    @Authorized
    @DeleteMapping("/{id}")
    public ResponseEntity<Product> deleteProduct(@PathVariable("id") int id) {
        Optional<Product> optional = productService.findById(id);

        if(!optional.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        productService.delete(id);

        return ResponseEntity.ok(optional.get());
    }

    @GetMapping("/cart")
    public List<Product> getCart(@RequestParam int userId) {
        System.out.println("Hit product controller get cart mapping");
        return productService.getCart(userId);
    }

    @PostMapping("/cart")
    public Cart addCart(@RequestParam int userId, @RequestParam int prodId){
        System.out.println("Hit product controller post mapping");
        CartDto cart = new CartDto(userId, prodId, userService, productService);
        User newUser = cart.getUser();
        Product newProduct = cart.getProduct();
        Cart temp = new Cart(null, newUser, newProduct);
        Cart newCart = productService.addCart(temp);
        return newCart;
    }

    @DeleteMapping("/cart")
    public void clearCart(@RequestParam("userId") int userId){
        productService.clearCart(userId);
    }
}
