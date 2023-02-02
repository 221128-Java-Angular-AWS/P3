package com.revature.repositories;

import com.revature.models.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;


public interface ProductRepository extends JpaRepository<Product, Integer> {
    @Query(value = "SELECT * FROM product WHERE id = :productId", nativeQuery = true)
    Product findByProdId(@Param("productId") Integer productId);

    @Query(value = "SELECT * FROM product WHERE genre = :genre AND id != :id" , nativeQuery = true)
    List<Product> findProductsByGenre(@Param("genre") String genre, @Param("id") Integer id);

    List<Product> findProductsByName(String name);
}
