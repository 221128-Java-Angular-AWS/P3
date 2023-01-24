package com.revature.models;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private int quantity;
    private double price;
    private String description;
    private String image;
    private String name;
    private String genre;

    @OneToMany(mappedBy = "product")
    @JsonManagedReference(value = "cart_product")
    private List<Cart> carts;

    @OneToMany(mappedBy = "product")
    @JsonManagedReference(value = "wish_product")
    private List<WishList> wishLists;

    @OneToMany(mappedBy = "product")
    @JsonManagedReference(value = "order_product")
    private List<OrderProduct> orders;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "product")
    @JsonManagedReference(value = "review_product")
    private List<Review> reviews;
}
