package com.revature.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Cart {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonBackReference(value = "cart_user")
    private User user;

    @ManyToOne
    @JoinColumn(name = "product_id")
    @JsonBackReference(value = "cart_product")
    private Product product;
}
