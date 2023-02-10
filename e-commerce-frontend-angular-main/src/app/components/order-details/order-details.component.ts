import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order } from 'src/app/models/order';
import { OrdersService } from 'src/app/services/orders.service';

/**
 * This component is a detailed view of a single order.
 * It shows information about the individual products in the order
 */
@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {

  order?: Order;
  errorMessage: string ='';

  constructor(private ordersService: OrdersService, private route: ActivatedRoute) { }

  /**
   * This function retrieves the order information when the component is initialized
   */
  ngOnInit(): void {
    const orderId = Number(this.route.snapshot.paramMap.get('id'));
    this.ordersService.getOrder(orderId).subscribe((order) => {
      if(order){
        this.order = order;
      }else{
        this.errorMessage = "No order with ID " + orderId + " found for current user";
      }
    })
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
}
