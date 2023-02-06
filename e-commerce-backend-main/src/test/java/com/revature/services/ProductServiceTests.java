package com.revature.services;

import com.revature.dtos.CartDto;
import com.revature.dtos.ProductInfo;
import com.revature.models.Cart;
import com.revature.models.Product;
import com.revature.models.User;
import com.revature.repositories.CartRepository;
import com.revature.repositories.ProductRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Sort;

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

    @Mock
    CartRepository mockCartRepository;

    @Mock
    private List<Cart> mockCartList;

    @Mock
    private Cart mockCart;

    @Mock
    private CartDto mockCartDto;

    private final Integer id = 1;

    private Boolean mockB = false;

    private final Integer quantity = 2;

    private Integer mockCId = -1;
    @Test
    void findAllTest() {

        sut = new ProductService(mockProductRepository, null);
        Mockito.when(mockProductRepository.findAll(Sort.by("id"))).thenReturn(mockProductList);
        Optional<List<Product>> products = Optional.of(sut.findAll());
        Assertions.assertEquals(Optional.of(mockProductList), products);
    }

    @Test
    void findByIdTest() {

        sut = new ProductService(mockProductRepository, null);
        Mockito.when(mockProductRepository.findById(id)).thenReturn(Optional.of(mockProduct));
        Optional<Product> product = sut.findById(id);
        Assertions.assertEquals(Optional.of(mockProduct), product);
    }

    @Test
    void saveTest() {
        sut = new ProductService(mockProductRepository, null);
        Mockito.when(mockProductRepository.save(mockProduct)).thenReturn(mockProduct);
        Optional<Product> product = Optional.of(sut.save(mockProduct));
        Assertions.assertEquals(Optional.of(mockProduct), product);
    }

    @Test
    void saveAllTest() {

        sut = new ProductService(mockProductRepository, null);
    Mockito.when(mockProductRepository.saveAll(mockProductList)).thenReturn(mockProductList);
        Optional<List<Product>> products = Optional.of(sut.saveAll(mockProductList, mockProductInfoList));
        Assertions.assertEquals(Optional.of(mockProductList), products);
    }

    @Test
    void deleteTest() {

        sut = new ProductService(mockProductRepository, null);
        sut.delete(id);
        verify(mockProductRepository).deleteById(id);
    }

    @Test
    void getCartTest(){
        sut = new ProductService(mockProductRepository, mockCartRepository);
        sut.getCart(id);
        Mockito.when(mockCartRepository.getCart(id)).thenReturn(mockCartList);
        List<Cart> carts = sut.getCart(id);
        Assertions.assertEquals(carts, mockCartList);
    }

    @Test
    void addCartTest(){
        sut = new ProductService(mockProductRepository, mockCartRepository);
        Mockito.when(mockCartRepository.save(mockCart)).thenReturn(mockCart);
        Cart c = sut.addCart(mockCart);
        Assertions.assertEquals(mockCart, c);
    }

    @Test
    void clearCartTest(){
        sut = new ProductService(mockProductRepository, mockCartRepository);
        sut.clearCart(id);
        verify(mockCartRepository).clearCart(id);
    }

    @Test
    void inCartTest(){
        sut = new ProductService(mockProductRepository, mockCartRepository);
        mockCartRepository.findAll().forEach( element ->{
            if(element.getUser().getId() == id && element.getProduct().getId() == id){
                mockB = true;
            }
        });
        boolean b = sut.inCart(id, id);
        Assertions.assertEquals(mockB, b);
    }

    @Test
    void findCartTest(){
        mockCartRepository.findAll().forEach(element ->{
            if(element.getUser().getId() == id && element.getProduct().getId() == id){
                mockCId = element.getId();
            }
        });
        sut = new ProductService(mockProductRepository, mockCartRepository);
        int cId = sut.findCart(id, id);
        Assertions.assertEquals(mockCId, cId);
    }

    @Test
    void addQuanCartTest(){
        Cart mockCart = new Cart(1, new User(1), new Product (1), 4);
        mockCart.setQuantity(mockCart.getQuantity() + quantity);
        Assertions.assertEquals(6, mockCart.getQuantity());
    }

    @Test
    void deleteCartProdTest(){
        sut = new ProductService(mockProductRepository, mockCartRepository);
        sut.deleteCartProduct(id, id);
        verify(mockCartRepository).deleteCartProduct(id, id);
    }
    
    void findByGenreTest() {
        String genre = "test";
        sut = new ProductService(mockProductRepository, null);
        Mockito.when(mockProductRepository.findProductsByGenre(genre, id)).thenReturn(mockProductList);
        Optional<List<Product>> genreProducts = Optional.of(sut.findByGenre(genre, id));
        Assertions.assertEquals(Optional.of(mockProductList), genreProducts);
    }

    @Test
    void findByNameTest() {
        String name = "Headphones";
        sut = new ProductService(mockProductRepository, null);
        Mockito.when(mockProductRepository.findProductsByName(name)).thenReturn(mockProductList);
        Optional<List<Product>> nameProducts = Optional.of(sut.findByName(name));
        Assertions.assertEquals(Optional.of(mockProductList), nameProducts);
    }
}
