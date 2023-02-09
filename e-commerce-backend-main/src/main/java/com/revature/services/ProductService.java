package com.revature.services;

import com.revature.dtos.ProductInfo;
import com.revature.models.Cart;
import com.revature.models.Product;
import com.revature.repositories.CartRepository;
import com.revature.repositories.ProductRepository;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

/**
 * This is the Product Service that handles communication between our controllers and repositories
 */
@Service
public class ProductService {
    private static boolean ispresent;
    private static int cartId;
    private final ProductRepository productRepository;
    private final CartRepository cartRepository;

    /**
     * Constructor for instantiating the Product Service
     * @param productRepository - Repository for handling SQL queries to the Product table
     * @param cartRepository - Repository for handling SQL queries to the Cart table
     */
    public ProductService(ProductRepository productRepository, CartRepository cartRepository) {
        this.productRepository = productRepository;
        this.cartRepository = cartRepository;
    }

    /**
     * Queries the database for a list of all Product
     * @return List of all Product in database table
     */
    public List<Product> findAll() {
        return productRepository.findAll(Sort.by("id"));
    }

    /**
     * Queries the database for a Product by id
     * @param id Product ID according to database table
     * @return Product based on ID or null
     */
    public Optional<Product> findById(int id) {
        return productRepository.findById(id);
    }

    /**
     * Save or update Product in database
     * @param product Product object containing product info
     * @return Product that was saved or updated
     */
    public Product save(Product product) {
        return productRepository.save(product);
    }

    /**
     * Save or update a list of Product in database
     * @param productList List of Product objects containing product info
     * @param metadata List of Product info objects
     * @return
     */
    public List<Product> saveAll(List<Product> productList, List<ProductInfo> metadata) {
    	return productRepository.saveAll(productList);
    }

    /**
     * Delete a row from database by Product ID
     * @param id Product ID to query for in database
     */
    public void delete(int id) {
        productRepository.deleteById(id);
    }

    /**
     * Find a list of Product by genre and exclude ID
     * @param genre Genre column in Product table
     * @param id ID to exclude from list
     * @return List of Product with corresponding genre
     */
    public List<Product> findByGenre(String genre, Integer id) {
        List<Product> genreList = findAll();

        genreList.removeIf(n -> (!n.getGenre().equals(genre)));
        genreList.removeIf(n -> (n.getId() == id));

        Collections.shuffle(genreList);

        return genreList;
    }

    /**
     * Find list of Product with string in its name
     * @param name String to search for in product name
     * @return List of Product containing string in its name
     */
    public List<Product> findByName(String name) {
        List<Product> productSearch = findAll();

        productSearch.removeIf(n -> (!n.getName().toLowerCase().contains(name)));

        return productSearch;
    }

    /**
     * Find Product by its ID
     * @param productId - Product ID of product
     * @return Product with corresponding ID
     */
    public Product findByProdId(Integer productId){
        return productRepository.findByProdId(productId);
    }

    public List<Cart> getCart(int id){
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
