package com.revature.services;

import com.revature.dtos.ProductInfo;
import com.revature.models.Product;
import com.revature.repositories.WishListRepository;
import com.revature.models.WishList;

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
public class WishListServiceTests {

  public WishListService sut;

  @Mock
  private Product mockProduct;

  @Mock
  private List<Product> mockProductList;

  @Mock
  private WishList mockWishListItem;

  @Mock
  private List<WishList> mockWishList;

  @Mock
  private List<ProductInfo> mockProductInfoList;

  @Mock
  WishListRepository mockWishListRepository;

  private final Integer id = 1;

  @Test
  void getWishListTest() {
      sut = new WishListService(mockWishListRepository);
      Mockito.when(mockWishListRepository.findUserWishList(id)).thenReturn(mockWishList);
      Optional<List<Product>> products = Optional.of(sut.getWishList(id));
      Assertions.assertEquals(Optional.of(mockWishList), products);
  }

  @Test
  void findByIdTest() {
      sut = new WishListService(mockWishListRepository);
      Mockito.when(mockWishListRepository.findById(id)).thenReturn(Optional.of(mockWishListItem));
      Optional<WishList> wishList = sut.findById(id);
      Assertions.assertEquals(Optional.of(mockWishListItem), wishList);
  }

  @Test
  void findByUserAndProductTest() {
      sut = new WishListService(mockWishListRepository);
      Mockito.when(mockWishListRepository.findByUserAndProduct(id, id)).thenReturn(Optional.of(mockWishListItem));
      Optional<WishList> wishListItem = sut.findByUserAndProduct(id, id);
      Assertions.assertEquals(Optional.of(mockWishListItem), wishListItem);
  }

  @Test
  void deleteWishListItemTest() {
      sut = new WishListService(mockWishListRepository);
      sut.deleteWishListItem(id);
      verify(mockWishListRepository).deleteById(id);
  }

}
