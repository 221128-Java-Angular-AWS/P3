import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  products: {
    product: Product,
    quantity: number
  }[] = [];
  totalPrice!: number;
  cartProducts: Product[] = [];
  subscription!: Subscription;

  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
    let id: number = Number(localStorage.getItem('user'));
    console.log(typeof(id));
    /*this.productService.getCart2(id).subscribe((data)=>{
      console.log(data);
    });*/
    this.subscription = this.productService.getCart2(id).subscribe((data)=>{
      console.log(data);
    });
    /*
    this.productService.getCart().subscribe(
      (cart) => {
        this.products = cart.products;
        this.products.forEach(
          (element) => this.cartProducts.push(element.product)
        );
        this.totalPrice = cart.totalPrice;
      }
    );
    */
  }
  delete(product_id: number): void{
   this.productService.getCart2(Number(localStorage.getItem('user'))).subscribe(
    (c)=>{
      console.log(c)
    }
   )
  }
  emptyCart(): void {
    let cart = {
      cartCount: 0,
      products: [],
      totalPrice: 0.00
    };
    this.productService.setCart(cart);
    this.router.navigate(['/home']);
  }

}
