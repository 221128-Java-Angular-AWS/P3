package com.revature.dtos;

import com.revature.models.Product;
import com.revature.models.User;
import com.revature.repositories.UserRepository;
import com.revature.services.ProductService;
import com.revature.services.UserService;

public class CartDto {

    private Integer user_id;
    private Integer product_id;
    private UserService userService;
    private ProductService productService;
    private Integer quantity;

    public CartDto(Integer userid, Integer productid, Integer quantity, UserService userService, ProductService productService){
        this.user_id = userid;
        this.product_id = productid;
        this.userService = userService;
        this.quantity = quantity;
        this.productService = productService;
    }

    public User getUser(){
        return userService.getUser(user_id);
    }
    public Product getProduct(){
        return productService.findByProdId(product_id);
    }
}
