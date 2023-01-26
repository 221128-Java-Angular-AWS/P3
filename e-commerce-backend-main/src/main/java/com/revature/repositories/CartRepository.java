package com.revature.repositories;

import com.revature.models.Cart;
import com.revature.models.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartRepository extends JpaRepository<Cart, Integer> {
}
