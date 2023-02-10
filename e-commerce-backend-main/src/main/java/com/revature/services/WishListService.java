package com.revature.services;

import com.revature.models.Product;
import com.revature.models.WishList;
import com.revature.repositories.ProductRepository;
import com.revature.repositories.WishListRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

/**
 * Contains business logic necessary to handle requests related to wishlists
 */
@Service
public class WishListService {

    private final WishListRepository wishListRepository;
    private final ProductRepository productRepository;

    public WishListService(WishListRepository wishListRepository, ProductRepository productRepository) {
        this.wishListRepository = wishListRepository;
        this.productRepository = productRepository;
    }

    /**
     * Retrieves a list of WishList objects and converts them to Product objects before returning
     * the list of product objects
     * @param userId ID of the user whose wishlist is being retrieved
     * @return List of products on the user's wishlist
     */

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

    /**
     * Retrieves a list of WishList objects and converts them to Product objects before returning
     * the list of product objects
     * @param id ID of the wishlist item to be deleted
     * @return None
     */

    public void deleteWishListItem(int id) {
        wishListRepository.deleteById(id);
    }

    /**
     * Adds an item to a user's wishlist
     * @param userId ID of the user whose wishlist is being modified
     * @param productId ID of the product to be added to the wishlist
     * @return int of the added product
     */

    public int addWishListItem(int userId, int productId) {
        // Check if the user's wishlist already contains the item. If not, add it.
        List<Product> wishList = getWishList(userId);
        Product itemToAdd = productRepository.findById(productId).get();
        if (wishList.contains(itemToAdd)) {
            return productId;
        }
        return wishListRepository.addWishListItem(userId, productId);
    }

    /**
     * Checks to see if an item is present on a user's wishlist
     * @param userId ID of the user whose wishlist is being checked
     * @param productId ID of the product being checked
     * @return Boolean that evaluates to true if the item is present, otherwise false
     */
    public Boolean checkIfWishListed(int userId, int productId) {
        if (wishListRepository.findByUserAndProduct(userId, productId).isPresent()) {
            return true;
        }
        return false;
    }

    /**
     * Retrieves a WishList item using that item's ID
     * @param id ID of the item to be retrieved
     * @return Optional of the WishList item
     */
    public Optional<WishList> findById(int id) {
        return wishListRepository.findById(id);
    }

    /**
     * Retrieves a WishList item using the current user's ID and the item's product ID
     * @param userId ID of the user whose wishlist item is being retrieved
     * @param productId ID of the product being retrieved
     * @return Optional of the WishList item
     */
    public Optional<WishList> findByUserAndProduct(int userId, int productId) {
        return wishListRepository.findByUserAndProduct(userId, productId);
    }

}
