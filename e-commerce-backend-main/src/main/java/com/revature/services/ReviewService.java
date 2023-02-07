package com.revature.services;

import com.revature.exceptions.NotReviewedException;
import com.revature.models.Product;
import com.revature.models.Review;
import com.revature.models.User;
import com.revature.repositories.ReviewRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReviewService {

    private final ReviewRepository reviewRepository;

    public ReviewService(ReviewRepository reviewRepository) { this.reviewRepository = reviewRepository;}
    public List<Review> getAll(Integer productId) {  return reviewRepository.getAll(productId);}

    public Double getAverage(Integer productId) {
        System.out.println("2000000000000");
        Double review = reviewRepository.getAvg(productId);
        if(review == null) {
            return 0.0;
            //throw new NotReviewedException("Product hasn't been reviewed yet!");
        } else {
            return review;
        }
    }

    public Review saveReview(Review review) {
        System.out.println("In save Review");
        return reviewRepository.save(review);
    }

    public List<Review> getReview(Integer userId, Integer productId){
        /*
        System.out.println("First in getReview method");
        List<Review> lall = reviewRepository.getAll();
        lall.forEach(x -> System.out.println(x));
        */

        List<Review> review = reviewRepository.findByUserIdAndProductId(userId, productId);
        //System.out.println("In service method of getReview(): " + review.getReviewId());
        if(review == null) throw new NotReviewedException("Product hasn't been reviewed by customer, yet!");
        else {
            return review;
        }
    }


}
