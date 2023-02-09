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

/**
 * Contains business logic necessary to handle requests related to orders
 */
@Service
public class OrderService {
    private OrderRepository orderRepo;

    @Autowired
    public OrderService(OrderRepository orderRepo){
        this.orderRepo = orderRepo;
    }

    /**
     * Sends a new order to be persisted into the database.
     * Includes verification to ensure that the order is valid
     * @param order The new order to be persisted in the database
     * @throws InvalidOrderException If the order has no products
     */
    public void createOrder(OrderDto order) throws InvalidOrderException{
        //Make sure the order has at least one product
        if(order.getProducts().size() > 0)
            //convert OrderDto to Order and save it
            orderRepo.save(order.toOrder());
        else {
            //Throw exception if there are no products in the order
            throw new InvalidOrderException("Invalid Order: no products");
        }
    }

    /**
     * Retrieves all orders belonging to a specific user
     * @param userId The user whose orders are being retrieved
     * @return The list of all of the user's orders
     */
    public List<OrderDto> getOrders(Integer userId){
        //retrieve orders from the database, convert into OrderDto's
        List<OrderDto> orders = new ArrayList<>();
        for(Order order : orderRepo.findByUserId(userId)){
            orders.add(new OrderDto(order));
        }
        return orders;
    }


    /**
     * Custom service to retrieve the 5 most recent orders for a user to be displayed on the user profile
     * facilitates communication between the OrderController and the OrderRepository
     * @param userId The userId for the user that orders are being retrieved for
     * @return A list of OrderDto objects to be displayed on the user profile
     */
    public List<OrderDto> getOrdersForProfile(Integer userId){
        List<OrderDto> orders = new ArrayList<>();
        for(Order order : orderRepo.findByUserIdWithLimit(userId)){
            orders.add(new OrderDto(order));
        }
        return orders;
    }

    /**
     * Retrieve a specific order belonging to a user
     * @param orderId The order being searched for
     * @param userId The user searching for the order
     * @return The order being requested
     * @throws InvalidOrderException If the user does not have an order with the specified order ID
     */
    public OrderDto getOrder(Integer orderId, Integer userId) throws InvalidOrderException{
        //find the order
        Order order = orderRepo.findByOrderIdAndUserId(orderId, userId);
        //throw an exception if the order doesn't exist or doesn't belong to that user
        if(order == null){
            throw new InvalidOrderException("No order with that ID found for current user");
        }
        return new OrderDto(order);
    }
}
