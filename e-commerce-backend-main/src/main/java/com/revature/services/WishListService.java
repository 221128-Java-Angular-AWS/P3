package com.revature.services;

import com.revature.models.Product;
import com.revature.models.WishList;
import com.revature.repositories.WishListRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class WishListService {

    private final WishListRepository wishListRepository;

    public WishListService(WishListRepository wishListRepository) {
        this.wishListRepository = wishListRepository;
    }

    public List<Product> getWishList(Integer userId) {
        List<WishList> wishList = wishListRepository.findUserWishList(userId);
        List<Product> wishProducts = new ArrayList<Product>();
        if (wishList.size() > 0) {
            for(WishList product: wishList) {
                wishProducts.add(product.getProduct());
            }
        }
        return wishProducts;
    }

    public void deleteWishListItem(int id) {
        wishListRepository.deleteById(id);
    }

    public int addWishListItem(int userId, int productId) {
        return wishListRepository.addWishListItem(userId, productId);
    }

    public Optional<WishList> findById(int id) {
        return wishListRepository.findById(id);
    }

    public Optional<WishList> findByUserAndProduct(int userId, int productId) {
        return wishListRepository.findByUserAndProduct(userId, productId);
    }

}
