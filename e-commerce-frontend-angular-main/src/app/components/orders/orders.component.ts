import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from 'src/app/models/order';
import { OrdersService } from 'src/app/services/orders.service';
import { ReviewService } from 'src/app/services/review.service';
import { Review } from 'src/app/models/review.model';
import { Product } from 'src/app/models/product';

/**
 * This component shows all of the previous orders belonging to the current user
 * Contains links to a detailed view of each of the orders
 */
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orders: Order[] = [];

  constructor(private ordersService: OrdersService, private reviewService: ReviewService, private router: Router, private route: ActivatedRoute) { }

  /**
   * This function retrieves all of the orders belonging to the current user when the component is initialized
   */
  ngOnInit(): void {
    
    this.ordersService.getOrders().subscribe((orders) => {this.orders = orders;});
  }

  /**
   * This function finds the total number of products in the order
   * @param order The order containing all of the products
   * @returns The total number of products
   */
  getItemTotal = function(order: Order): number{
    if(order.products == null){return 0}
    let count: number = 0;
    for(let product of order.products){
      count += product.quantity;
    }
    return count;
  }

  /**
   * This function finds the total cost of all of the products in the order
   * @param order The order containing all of the products
   * @returns The total cost of the products
   */
  getTotalCost = function(order: Order): number{
    if(order.products == null){return 0}
    let count: number = 0;
    for(let product of order.products){
      count += product.product.price * product.quantity;
    }
    return count;
  }

  // redirects to review by product id
  goToReviewProduct(product: Product) {
    this.router.navigate([`/review/${product.id}`])
  }

  // check if review has already been made by user
  checkReviewed(product: Product): boolean{
    let booleanReview = false;
    let reviewedList = null;
    console.log(product?.id);
    if(product){
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
