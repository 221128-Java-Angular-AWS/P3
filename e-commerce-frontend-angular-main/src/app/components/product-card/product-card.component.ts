import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';

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

  @Input() productInfo!: Product;

  constructor(
    private productService: ProductService,
    private router: Router) {
      //this allows the related items to change page
      this.router.routeReuseStrategy.shouldReuseRoute = function () {
        return false;
    }
  }
  
  
  ngOnInit(): void {
  }

  

  
  ngOnDestroy() {
    // this.subscription.unsubscribe();
  }

}
