package com.revature.repositories;

import com.revature.models.Order;
import com.revature.models.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order, Integer> {
}
