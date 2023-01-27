package com.revature.services;

import com.revature.dtos.OrderDto;
import com.revature.exceptions.InvalidOrderException;
import com.revature.models.Order;
import com.revature.repositories.OrderRepository;
import org.aspectj.weaver.ast.Or;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class OrderService {
    private OrderRepository orderRepo;

    @Autowired
    public OrderService(OrderRepository orderRepo){
        this.orderRepo = orderRepo;
    }

    public void createOrder(OrderDto order) throws InvalidOrderException{
        if(order.getProducts().size() > 0)
            orderRepo.save(order.toOrder());
        else {
            throw new InvalidOrderException("Invalid Order: no products");
        }
    }

    public List<OrderDto> getOrders(Integer userId){
        List<OrderDto> orders = new ArrayList<>();
        for(Order order : orderRepo.findByUserId(userId)){
            orders.add(new OrderDto(order));
        }
        return orders;
    }

    // try overload at first, might be better just to rename
    public List<OrderDto> getOrdersForProfile(Integer userId){
        List<OrderDto> orders = new ArrayList<>();
        for(Order order : orderRepo.findByUserIdWithLimit(userId)){
            orders.add(new OrderDto(order));
        }
        return orders;
    }

    public OrderDto getOrder(Integer orderId, Integer userId){
        Order order = orderRepo.findByOrderIdAndUserId(orderId, userId);
        if(order == null){
            throw new InvalidOrderException("No order with that ID found for current user");
        }
        return new OrderDto(order);
    }
}
