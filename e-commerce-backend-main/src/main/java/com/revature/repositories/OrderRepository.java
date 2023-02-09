package com.revature.repositories;

import com.revature.models.Order;
import com.revature.models.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Integer> {

    /**
     * Finds all orders belonging to a user
     * @param userId The ID of the user whose orders are being retrieved
     * @return The list of orders belonging to the user
     */
    public List<Order> findByUserId(Integer userId);

    /**
     * Retrieves the 5 most recent orders belonging to a user
     * @param userId The ID of the user whose orders are being retrieved
     * @return The list of the user's orders
     */
    @Query(value = "SELECT * FROM orders WHERE user_id = :userId ORDER BY date_ordered DESC LIMIT 5;", nativeQuery = true)
    public List<Order> findByUserIdWithLimit(@Param("userId") Integer userId);

    /**
     * Retrieves a specific order belonging to a user
     * @param orderId The ID of the order being requested
     * @param userId The ID of the user requesting the order
     * @return The requested order
     */
    public Order findByOrderIdAndUserId(Integer orderId, Integer userId);
}
