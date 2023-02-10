package com.revature.repositories;

import com.revature.models.WishList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

public interface WishListRepository extends JpaRepository<WishList, Integer> {

    /**
     * Retrieves all WishList items on a user's wishlist
     * @param userId The ID of the user whose wishlist is being retrieved
     * @return The list of WishList items associated with the user
     */
    @Query(value = "SELECT * FROM wish_list WHERE user_id = :userId", nativeQuery = true)
    List<WishList> findUserWishList(@Param("userId") Integer userId);

    /**
     * Finds the WishList item associated with a user ID and product ID
     * @param userId The ID of the user whose wishlist is being retrieved
     * @param productId The ID of the product being retrieved
     * @return Optional of the retrieved WishList item
     */
    @Query(value = "SELECT * FROM wish_list WHERE user_id = :userId AND product_id = :productId", nativeQuery = true)
    Optional<WishList> findByUserAndProduct(@Param("userId") Integer userId, @Param("productId") Integer productId);

    /**
     * Adds a product to a user's wishlist
     * @param userId The ID of the user whose wishlist is being modified
     * @param productId The ID of the product being added
     * @return Integer of the added product's ID
     */
    @Modifying
    @Transactional
    @Query(value = "INSERT INTO wish_list (user_id, product_id) VALUES (:userId, :productId)", nativeQuery = true)
    int addWishListItem(@Param("userId") Integer userId, @Param("productId") Integer productId);
}
