package com.revature.repositories;

import com.revature.models.Product;
import com.revature.models.Review;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReviewRepository extends JpaRepository<Review, Integer> {
}
