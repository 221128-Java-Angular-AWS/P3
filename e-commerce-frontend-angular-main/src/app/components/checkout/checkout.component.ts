import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { OrdersService } from 'src/app/services/orders.service';
import { ReviewService } from 'src/app/services/review.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  products: {
    product: Product,
    quantity: number
  }[] = [];
  totalPrice: number = 0;
  cartProducts: Product[] = [];
  finalProducts: {id: number, quantity: number}[] = []; 
  ping: string="";
  userId!: number;

  checkoutForm = new UntypedFormGroup({
    fname: new UntypedFormControl('', Validators.required),
    lname: new UntypedFormControl('', Validators.required),
    cardName: new UntypedFormControl('', Validators.required),
    detail: new UntypedFormControl('', Validators.required),
    addOne: new UntypedFormControl('', Validators.required),
    addTwo: new UntypedFormControl(''),
    city: new UntypedFormControl('', Validators.required),
    state: new UntypedFormControl('', Validators.required),
    zipCode: new UntypedFormControl('', Validators.required),
    country: new UntypedFormControl('', Validators.required)
  });

  constructor(private productService: ProductService,private ordersService: OrdersService, private router: Router, private reviewService: ReviewService) { }

  ngOnInit(): void {
    this.productService.getUserId().subscribe((id)=>{
      this.userId = id;
      this.productService.getCart2(id).subscribe((data: any)=>{
        data.forEach(
          (element: any)=> {
            console.log(element)
            this.productService.getSingleCartProduct(element.productId).subscribe((data2: any) =>{
              this.products.push({product: data2, quantity: element.quantity});
              this.totalPrice += data2.price *element.quantity;
            });
          }
        )
      });
    })
  }

  onSubmit(): void {
    this.products.forEach(
      (element) => {
        const id = element.product.id;
        const quantity = element.quantity
        this.finalProducts.push({id, quantity})
      } 
    );
    if(this.finalProducts.length > 0) {
      this.productService.purchase(this.finalProducts).subscribe(
        (resp) => console.log(resp),
        (err) => {console.log("purchase failed"); 
        window.alert("Purchase failed. Please make sure your selected quantity does not exceed the stock quantity.")},
        () => {
          this.productService.emptyCart(this.userId).subscribe(()=>{});
          this.ordersService.createOrder(this.finalProducts).subscribe(()=>{});
          this.router.navigate(['/home']);
        } 
      );

    } else {
      this.router.navigate(['/home']);
    }
  }

}
