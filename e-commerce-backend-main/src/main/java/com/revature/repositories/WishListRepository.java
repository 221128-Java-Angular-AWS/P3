package com.revature.repositories;

import com.revature.models.Order;
import com.revature.models.WishList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface WishListRepository extends JpaRepository<WishList, Integer> {

    @Query(value = "SELECT * FROM wish_list WHERE user_id = :userId", nativeQuery = true)
    List<WishList> findUserWishList(@Param("userId") Integer userId);
}
