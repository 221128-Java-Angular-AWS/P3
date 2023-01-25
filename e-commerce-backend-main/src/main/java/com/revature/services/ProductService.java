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

    public Product findByProdId(Integer productId){
        return productRepository.findByProdId(productId);
    }

    public List<Product> getCart(int id){
        /* 
        List <Product> p = new ArrayList <Product>();
        for(int i = 0; i < cartRepository.getCart(id).size(); i++){
            p.add(productRepository.getById(cartRepository.getCart(id).get(i)));
        }
        return p;*/
        // list of product id's are returned by cartrepo.getCart(id)
        // System.out.println(productRepository.findAllById(cartRepository.getCart(id)));
        System.out.println(cartRepository.getCart(id));
        System.out.println(productRepository.findAllById(cartRepository.getCart(id)).size());
        for(int i = 0; i< productRepository.findAllById(cartRepository.getCart(id)).size(); i++){
            System.out.println(productRepository.findAllById(cartRepository.getCart(id)).get(i).getName());
        }
        //System.out.println(productRepository.findAllById(cartRepository.getCart(id)));
        return productRepository.findAllById(cartRepository.getCart(id));
    }

    public Cart addCart(Cart cart){
        return cartRepository.save(cart);
    }

    public void clearCart(Integer id){
        cartRepository.clearCart(id);
    }
}
