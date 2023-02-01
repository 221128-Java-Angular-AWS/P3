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
  /*
  products: {
    product: Product
  }[] = [];
  */
  totalPrice: number = 0;
  cartProducts: Product[] = [];
  subscription!: Subscription;

  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
    let id: number = Number(localStorage.getItem('user'));
    /*this.productService.getCart2(id).subscribe((data)=>{
      console.log(data);
    });*/
    this.productService.getCart2(id).subscribe((data: any)=>{
      data.forEach(
        (element: any)=> {
          this.productService.getSingleCartProduct(element.productId).subscribe((data2: any) =>{
            this.products.push({product: data2, quantity: element.quantity});
            this.totalPrice += data2.price *element.quantity;
          });
        }
      )
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
    );*/
    
  }
  delete(product_id: number): void{
    console.log(product_id)
    let userId = Number(localStorage.getItem('user'));
    this.productService.removeCartItem(userId, product_id).subscribe(()=>{
    });
    window.location.reload();
  }
  emptyCart(): void {
    /*
    let cart = {
      cartCount: 0,
      products: [],
      totalPrice: 0.00
    };
    this.productService.setCart(cart);
    this.router.navigate(['/home']);*/
    let id: number = Number(localStorage.getItem('user'));
    this.productService.emptyCart(id).subscribe(()=>{});
    this.router.navigate(['/home']);
  }

}
