package com.revature.repositories;

import com.revature.models.Order;
import com.revature.models.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Integer> {

    //find all orders belonging to a user
    public List<Order> findByUserId(Integer userId);

    //find a specific order belonging to a user
    public Order findByOrderIdAndUserId(Integer orderId, Integer userId);
}
