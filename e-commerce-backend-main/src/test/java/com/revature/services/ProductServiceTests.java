package com.revature.services;

import com.revature.dtos.ProductInfo;
import com.revature.models.Product;
import com.revature.repositories.ProductRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ProductServiceTests {
    public ProductService sut;

    @Mock
    private Product mockProduct;

    @Mock
    private List<Product> mockProductList;

    @Mock
    private List<ProductInfo> mockProductInfoList;

    @Mock
    ProductRepository mockProductRepository;

    private final Integer id = 1;

    @Test
    void findAllTest() {
        sut = new ProductService(mockProductRepository);
        Mockito.when(mockProductRepository.findAll()).thenReturn(mockProductList);
        Optional<List<Product>> products = Optional.of(sut.findAll());
        Assertions.assertEquals(Optional.of(mockProductList), products);
    }

    @Test
    void findByIdTest() {
        sut = new ProductService(mockProductRepository);
        Mockito.when(mockProductRepository.findById(id)).thenReturn(Optional.of(mockProduct));
        Optional<Product> product = sut.findById(id);
        Assertions.assertEquals(Optional.of(mockProduct), product);
    }

    @Test
    void saveTest() {
        sut = new ProductService(mockProductRepository);
        Mockito.when(mockProductRepository.save(mockProduct)).thenReturn(mockProduct);
        Optional<Product> product = Optional.of(sut.save(mockProduct));
        Assertions.assertEquals(Optional.of(mockProduct), product);
    }

    @Test
    void saveAllTest() {
        sut = new ProductService(mockProductRepository);
        Mockito.when(mockProductRepository.saveAll(mockProductList)).thenReturn(mockProductList);
        Optional<List<Product>> products = Optional.of(sut.saveAll(mockProductList, mockProductInfoList));
        Assertions.assertEquals(Optional.of(mockProductList), products);
    }

    @Test
    void deleteTest() {
        sut = new ProductService(mockProductRepository);
        sut.delete(id);
        verify(mockProductRepository).deleteById(id);
    }
}
