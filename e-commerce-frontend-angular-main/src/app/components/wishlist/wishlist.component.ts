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
  userId!: number;

  ngOnInit(): void {
    //Retrieve wishlist products and userID
    this.wishListService.getWishListProducts().subscribe(
      (resp) => this.products = resp,
      (err) => console.log(err),
      () => {}
    );
    this.productService.getUserId().subscribe((id)=> {this.userId = id});
  }

  //Removes item from wishlist, and also splices it out of the frontend product array
  removeFromWishList(product: Product): void {
    this.wishListService.removeFromWishList(product.id)
    .subscribe();
    this.products.splice(this.products.indexOf(product), 1);
  }

  // adds the product to the cart
  addToCart(product: Product): void {
    this.productService.addCart(this.userId, product.id, 1)
    .subscribe();
  }
}
