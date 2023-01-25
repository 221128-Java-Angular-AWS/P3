package com.revature.services;

import com.revature.dtos.OrderDto;
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

    public void createOrder(OrderDto order){
        orderRepo.save(order.toOrder());
    }

    public List<OrderDto> getOrders(Integer userId){
        List<OrderDto> orders = new ArrayList<>();
        for(Order order : orderRepo.findByUserId(userId)){
            orders.add(new OrderDto(order));
        }
        return orders;
    }
}
