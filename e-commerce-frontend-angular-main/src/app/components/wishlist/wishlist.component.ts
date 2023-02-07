import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { WishListService } from 'src/app/services/wishList.service';
import { ProfileService } from 'src/app/services/profile.service';
import { User } from 'src/app/models/user';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {

  constructor(
    private wishListService: WishListService,
    private profileService: ProfileService,
    private productService: ProductService
    ) { }

  products: Product[] = [];
  user!: User;

  ngOnInit(): void {
    this.wishListService.getWishListProducts().subscribe(
      (resp) => this.products = resp,
      (err) => console.log(err),
      () => {}
    );
  }

  removeFromWishList(product: Product): void {
    this.wishListService.removeFromWishList(product.id)
    .subscribe();
    this.products.splice(this.products.indexOf(product), 1);
  }

  addToCart(product: Product, userId: Number): void {
    this.productService.addCart(userId.valueOf(), product.id, 1)
    .subscribe((cart) => console.log(cart));
  }
}
