package com.revature.repositories;

import com.revature.models.Order;
import com.revature.models.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Integer> {

    public List<Order> findByUserId(Integer userId);

    @Query(value = "SELECT * FROM orders WHERE user_id = :userId ORDER BY date_ordered DESC LIMIT 5;", nativeQuery = true)
    public List<Order> findByUserIdWithLimit(@Param("userId") Integer userId);

    public Order findByOrderIdAndUserId(Integer orderId, Integer userId);
}
