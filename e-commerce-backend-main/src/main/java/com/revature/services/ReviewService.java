package com.revature.services;

import com.revature.models.Review;
import com.revature.repositories.ReviewRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReviewService {

    private final ReviewRepository reviewRepository;

    public ReviewService(ReviewRepository reviewRepository) { this.reviewRepository = reviewRepository;}
    public List<Review> getAll() {  return reviewRepository.findAll();}

    public Review saveReview(Review review) {
        System.out.println("In save Review");
        return reviewRepository.save(review);
    }


}
