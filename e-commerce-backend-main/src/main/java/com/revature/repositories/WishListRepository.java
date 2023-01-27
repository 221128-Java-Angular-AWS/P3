package com.revature.repositories;

import com.revature.models.Order;
import com.revature.models.WishList;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WishListRepository extends JpaRepository<WishList, Integer> {
}
