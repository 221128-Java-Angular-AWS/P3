import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { WishListService } from 'src/app/services/wishList.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {

  constructor(private wishListService: WishListService) { }

  products: Product[] = [];

  ngOnInit(): void {
    console.log('getting products for wishlist');
    this.wishListService.getWishListProducts().subscribe(
      (resp) => this.products = resp,
      (err) => console.log(err),
      () => console.log("WishList Products Retrieved")
    );
  }

}
