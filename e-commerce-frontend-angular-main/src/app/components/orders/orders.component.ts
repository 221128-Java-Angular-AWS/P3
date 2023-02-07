import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from 'src/app/models/order';
import { OrderProduct } from 'src/app/models/order-product';
import { OrdersService } from 'src/app/services/orders.service';
import { ReviewComponent } from '../review/review.component';
import { ReviewService } from 'src/app/services/review.service';
import { Review } from 'src/app/models/review.model';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orders: Order[] = [];

  constructor(private ordersService: OrdersService, private reviewService: ReviewService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    
    this.ordersService.getOrders().subscribe((orders) => {this.orders = orders;});
  }

  getItemTotal = function(order: Order): number{
    if(order.products == null){return 0}
    let count: number = 0;
    for(let product of order.products){
      count += product.quantity;
    }
    return count;
  }

  getTotalCost = function(order: Order): number{
    if(order.products == null){return 0}
    let count: number = 0;
    for(let product of order.products){
      count += product.product.price * product.quantity;
    }
    return count;
  }

  goToReviewProduct(product: Product) {
    this.router.navigate([`/review/${product.id}`])
  }

  checkReviewed(product: Product): boolean{
    let booleanReview = false;
    let reviewedList = null;
    console.log(product?.id);
    if(product){
      //console.log("product: "+this.product.id);
      this.reviewService.getReview(product?.id).subscribe((hasBeenReviewed: Review[]) => {
        reviewedList = hasBeenReviewed;
        console.log("Response happens now, hasBeenReviewed Object");
        console.log(JSON.stringify(reviewedList));
        if(reviewedList) booleanReview = true;
      })
    }
    return booleanReview;
  }

}
