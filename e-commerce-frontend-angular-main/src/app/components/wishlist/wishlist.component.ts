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
    console.log('Initializing wishlist');
    this.profileService.getUser().subscribe(
      (resp) => {
        this.user = resp;
        this.wishListService.getWishListProducts(resp.id!).subscribe(
          (resp) => this.products = resp,
          (err) => console.log(err),
          () => console.log("WishList products retrieved")
        );
      },
      (err) => console.log(err),
      () => console.log("User retrieved")
    );
  }

  removeFromWishList(product: Product, userId: Number): void {
    this.wishListService.removeFromWishList(product.id, userId)
    .subscribe(() => console.log('Wishlist item deleted'));
    this.products.splice(this.products.indexOf(product), 1);
  }

  addToCart(product: Product, userId: Number): void {
    this.productService.addCart(userId.valueOf(), product.id, 1)
    .subscribe(() => console.log('Product added to cart from wishlist'));
  }
}
