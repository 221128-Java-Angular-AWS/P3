import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order } from 'src/app/models/order';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {

  order?: Order;
  errorMessage: string ='';

  constructor(private ordersService: OrdersService, private route: ActivatedRoute) { }

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
}
