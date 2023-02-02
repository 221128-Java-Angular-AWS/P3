package com.revature.services;

import com.revature.dtos.ProductInfo;
import com.revature.models.Cart;
import com.revature.models.Product;
import com.revature.repositories.CartRepository;
import com.revature.repositories.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ProductService {
    private static boolean ispresent;
    private static int cartId;
    private final ProductRepository productRepository;
    private final CartRepository cartRepository;

    public ProductService(ProductRepository productRepository, CartRepository cartRepository) {
        this.productRepository = productRepository;
        this.cartRepository = cartRepository;
    }

    public List<Product> findAll() {
        return productRepository.findAll();
    }

    public Optional<Product> findById(int id) {
        return productRepository.findById(id);
    }

    public Product save(Product product) {
        return productRepository.save(product);
    }
    
    public List<Product> saveAll(List<Product> productList, List<ProductInfo> metadata) {
    	return productRepository.saveAll(productList);
    }

    public void delete(int id) {
        productRepository.deleteById(id);
    }

    public List<Product> findByGenre(String genre) { return productRepository.findByGenreContainsIgnoreCase(genre); }

    public Product findByProdId(Integer productId){
        return productRepository.findByProdId(productId);
    }

    public List<Cart> getCart(int id){
        // System.out.println(cartRepository.getCart(id));
        return cartRepository.getCart(id);
    }

    public Cart addCart(Cart cart){
        return cartRepository.save(cart);
    }

    public void clearCart(Integer id){
        cartRepository.clearCart(id);
    }

    public boolean inCart(Integer userId, Integer prodId){
        ispresent = false;
        cartRepository.findAll().forEach(element ->{
            if(element.getUser().getId() == userId && element.getProduct().getId() == prodId){
                ispresent = true;
            }
        });
        return ispresent;
    }

    public int findCart(Integer userId, Integer prodId){
        cartId = -1;
        cartRepository.findAll().forEach(element ->{
            if(element.getUser().getId() == userId && element.getProduct().getId() == prodId){
                cartId = element.getId();
            }
        });
        return cartId;
    }
    public Cart addQuanToCart(Integer cartId, Integer quantity){
        Cart c = cartRepository.findById(cartId).get();
        int currentQuantity = c.getQuantity();
        c.setQuantity(currentQuantity + quantity);
        return c;
    }

    public void deleteCartProduct(Integer userId, Integer prodId){
        cartRepository.deleteCartProduct(userId, prodId);
    }
}