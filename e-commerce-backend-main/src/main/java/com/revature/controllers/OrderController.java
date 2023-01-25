package com.revature.controllers;

import com.revature.annotations.Authorized;
import com.revature.dtos.OrderDto;
import com.revature.models.Order;
import com.revature.models.User;
import com.revature.services.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/order")
@CrossOrigin(origins = {"http://localhost:4200", "http://localhost:3000"}, allowCredentials = "true")
public class OrderController {
    private OrderService orderService;
    private HttpServletRequest req;

    @Autowired
    public OrderController(OrderService orderService, HttpServletRequest req){
        this.orderService = orderService;
        this.req = req;
    }

    @PostMapping
    @ResponseStatus(value = HttpStatus.ACCEPTED)
    public void createOrder(@RequestBody OrderDto order){
        orderService.createOrder(order);
    }

    @GetMapping
    @ResponseStatus(value = HttpStatus.ACCEPTED)
    @Authorized
    public @ResponseBody List<OrderDto> getOrders(HttpSession session){
        System.out.println("get orders: " + session.getAttribute("user"));
        System.out.println("alt: " + req.getSession().getAttribute("user"));
        if(session.getAttribute("user") != null) {
            return orderService.getOrders(((User)session.getAttribute("user")).getId());
        }
        return new ArrayList<OrderDto>();
    }

//    @GetMapping
//    @ResponseStatus(value = HttpStatus.ACCEPTED)
//    public @ResponseBody List<OrderDto> getOrders(@RequestParam Integer userId){
//        return orderService.getOrders(userId);
//    }


}
