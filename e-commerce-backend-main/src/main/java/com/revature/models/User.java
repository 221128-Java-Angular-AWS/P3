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
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String email;
    private String password;
    private String firstName;
    private String lastName;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "user")
    @JsonManagedReference(value = "order_user")
    private List<Order> orders;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "user")
    @JsonManagedReference(value = "review_user")
    private List<Review> reviews;

    @OneToMany(mappedBy = "user")
    @JsonManagedReference(value = "cart_user")
    private List<Cart> cart;

    @OneToMany(mappedBy = "user")
    @JsonManagedReference(value = "wish_user")
    private List<WishList> wishList;

    public User(int id, String email, String password, String firstName, String lastName) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
    }

    public User(String email, String password, String firstName, String lastName) {
        this.email = email;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
    }
}
