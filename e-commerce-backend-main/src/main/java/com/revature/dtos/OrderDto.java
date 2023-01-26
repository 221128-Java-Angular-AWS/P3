package com.revature.dtos;

import com.revature.models.Order;
import com.revature.models.OrderProduct;
import com.revature.models.Product;
import com.revature.models.User;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

public class OrderDto {

    private Integer orderId;
    private LocalDateTime dateOrdered;
    private User user;
    private List<OrderProductDto> products;

    public OrderDto() {
    }

    public OrderDto(Integer orderId, LocalDateTime dateOrdered, User user, List<OrderProductDto> products) {
        this.orderId = orderId;
        this.dateOrdered = dateOrdered;
        this.user = user;
        this.products = products;
    }

    public OrderDto(LocalDateTime dateOrdered, User user, List<OrderProductDto> products) {
        this.dateOrdered = dateOrdered;
        this.user = user;
        this.products = products;
    }

    public OrderDto(Order order){
        this.orderId = order.getOrderId();
        this.dateOrdered = order.getDateOrdered();
        this.user = order.getUser();
        this.products = new ArrayList<>();
        for(OrderProduct orderProduct : order.getOrderProducts()){
            products.add(new OrderProductDto(orderProduct.getProduct(), orderProduct.getQuantity()));
        }
    }

    public Integer getOrderId() {
        return orderId;
    }

    public void setOrderId(Integer orderId) {
        this.orderId = orderId;
    }

    public LocalDateTime getDateOrdered() {
        return dateOrdered;
    }

    public void setDateOrdered(LocalDateTime dateOrdered) {
        this.dateOrdered = dateOrdered;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public List<OrderProductDto> getProducts() {
        return products;
    }

    public void setProducts(List<OrderProductDto> products) {
        this.products = products;
    }

    public Order toOrder(){
        Order order = new Order();
        if(orderId != null) order.setOrderId(orderId);
        order.setDateOrdered(dateOrdered);
        order.setUser(user);
        List<OrderProduct> orderProducts = new ArrayList<>();
        for (OrderProductDto product : products) {
            orderProducts.add(new OrderProduct(order, product.getProduct(), product.getQuantity()));
        }
        order.setOrderProducts(orderProducts);

        return order;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        OrderDto orderDto = (OrderDto) o;
        return Objects.equals(orderId, orderDto.orderId) && Objects.equals(dateOrdered, orderDto.dateOrdered) && Objects.equals(user, orderDto.user) && Objects.equals(products, orderDto.products);
    }

    @Override
    public int hashCode() {
        return Objects.hash(orderId, dateOrdered, user, products);
    }
}
