package com.revature.controllers;

import com.revature.annotations.Authorized;
import com.revature.dtos.OrderDto;
import com.revature.dtos.OrderProductDto;
import com.revature.dtos.ProductInfo;
import com.revature.exceptions.InvalidOrderException;
import com.revature.models.Order;
import com.revature.models.Product;
import com.revature.models.User;
import com.revature.services.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/order")
//@CrossOrigin(origins = {"http://localhost:4200", "http://localhost:3000", "http://p3-static-hosting.s3-website.us-east-2.amazonaws.com"}, allowCredentials = "true")
@CrossOrigin(origins = "", allowCredentials = "true")
public class OrderController {
    private OrderService orderService;
    private HttpServletRequest req;

    @Autowired
    public OrderController(OrderService orderService, HttpServletRequest req){
        this.orderService = orderService;
        this.req = req;
    }

    @PostMapping
    @Authorized
    public ResponseEntity createOrder(HttpSession session, @RequestBody List<ProductInfo> products){
        List<OrderProductDto> orderProducts = new ArrayList<>();
        for(ProductInfo product : products){
            orderProducts.add(new OrderProductDto(new Product(product.getId()), product.getQuantity()));
        }
        OrderDto order = new OrderDto(LocalDateTime.now(), ((User)session.getAttribute("user")).getId(), orderProducts);
        try {
            orderService.createOrder(order);
            return ResponseEntity.accepted().build();
        }catch(InvalidOrderException e){
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping
    @ResponseStatus(value = HttpStatus.ACCEPTED)
    @Authorized
    public ResponseEntity<List<OrderDto>> getOrders(HttpSession session){
        if(session.getAttribute("user") != null) {
            return ResponseEntity.ok(orderService.getOrders(((User)session.getAttribute("user")).getId()));
        }
        return ResponseEntity.badRequest().build();
    }

    @GetMapping("/{id}")
    @ResponseStatus(value = HttpStatus.ACCEPTED)
    @Authorized
    public ResponseEntity getOrder(HttpSession session, @PathVariable("id") Integer orderId){
        if(session.getAttribute("user") != null) {
            try {
                return ResponseEntity.ok(orderService.getOrder(orderId, ((User) session.getAttribute("user")).getId()));
            }catch(InvalidOrderException ex){
                return ResponseEntity.badRequest().body(ex.getMessage());
            }
        }
        return ResponseEntity.badRequest().body("Not logged in");
    }

//    @GetMapping
//    @ResponseStatus(value = HttpStatus.ACCEPTED)
//    public @ResponseBody List<OrderDto> getOrders(@RequestParam Integer userId){
//        return orderService.getOrders(userId);
//    }


}
