package com.revature.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "reviews")
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int reviewId;
    private String message;
    private int rating;

    //Foreign key
    @ManyToOne(cascade = CascadeType.MERGE)
    @JsonBackReference(value = "review_user")
    @JoinColumn(name = "user_id")
    @JsonProperty
    private User user;

    //Foreign Key: product
    @ManyToOne(cascade = CascadeType.MERGE)
    @JsonBackReference(value = "review_product")
    @JoinColumn(name = "product_id")
    @JsonProperty
    private Product product;

    //Create most basic review instance
    public Review(int reviewId) {
        this.reviewId = reviewId;
    }

    //Create the most basic full form for review
    public Review(String message, int rating, User user, Product product) {
        this.message = message;
        this.rating = rating;
        this.user = user;
        this.product = product;
    }

    /**
     * All-args & No-args constructor is given thanks to annotations for the Review class
     */
}
