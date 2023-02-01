import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

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

  constructor(private productService: ProductService) { }
  
  
  ngOnInit(): void {
    /*
    this.subscription = this.productService.getCart().subscribe(
      (cart) => {
        this.cartCount = cart.cartCount;
        this.products = cart.products;
        this.totalPrice = cart.totalPrice;
      }
    );*/
    let id: number = Number(localStorage.getItem('user'));
    this.subscription = this.productService.getCart2(id).subscribe(
      (data: any)=>{
        data.forEach(
          (element: any)=> {
            console.log(element)
            this.productService.getSingleCartProduct(element.productId).subscribe((data2: any) =>{
              this.products.push({product: data2, quantity: element.quantity});
              this.totalPrice += data2.price *element.quantity;
              this.cartCount += element.quantity;
            });
          }
        )
      }
    )
  }

  addToCart(product: Product): void {

    let userId = Number(localStorage.getItem('user'));
    this.productService.addCart(userId, product.id).subscribe((cart)=>{
      console.log(cart);
    });
  }

  
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
