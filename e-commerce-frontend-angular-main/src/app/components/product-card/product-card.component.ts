import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';
import { WishListService } from 'src/app/services/wishList.service';
import { User } from 'src/app/models/user';


@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit{

  cartCount!: number;
  products: {
    product: Product,
    quantity: number
  }[] = [];
  subscription!: Subscription;
  totalPrice: number = 0;
  userId!: number;

  @Input() productInfo!: Product;
  @Input() user!: User;
  wishListed: Boolean = false;

  constructor(
    private productService: ProductService,
    private wishListService: WishListService,
    private router: Router) {
      //this allows the related items to change page
      this.router.routeReuseStrategy.shouldReuseRoute = function () {
        return false;
    }
  }


  ngOnInit(): void {
    this.productService.getUserId().subscribe((id)=> {this.userId = id})
  }




  ngOnDestroy() {
    // this.subscription.unsubscribe();
  }

  addToWishList(product: Product): void {
    this.wishListed = true;
    this.wishListService.addToWishList(product.id)
    .subscribe();
  }

  addToCart(product: Product): void{
    this.productService.addCart(this.userId, product.id, 1).subscribe(()=>{});
  }

}
