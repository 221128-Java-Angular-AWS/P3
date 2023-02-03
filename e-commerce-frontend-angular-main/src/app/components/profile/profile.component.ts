import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { ProfileService } from 'src/app/services/profile.service';
import { OrdersService } from 'src/app/services/orders.service';
import { Order } from 'src/app/models/order';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user?: User;
  editUser: boolean = false;
  orders: Order[] = []

  constructor(
    private profileService: ProfileService,
    private ordersService: OrdersService,
    private route: ActivatedRoute,
    private router: Router

  ) { }

  ngOnInit(): void {
    this.profileService.getUser().subscribe(
      (resp) => this.user = resp,
      (err) => console.log(err),
      () => console.log("User retrieved")
    );
    this.ordersService.getOrdersForProfile().subscribe(
      (resp) => this.orders = resp,
      (err) => console.log(err),
      () => console.log("Orders retrieved")
      );
  }

  editMode(): void {
    this.editUser = true;
  }

  cancelEdit(): void {
    this.editUser = false;
  }

  save(email: string, firstName: string, lastName: string, password?: string) {
    let updateUser = new User()
    if (this.user != undefined) {
      updateUser.id = this.user.id;
    }

    updateUser.email = email;
    updateUser.firstName = firstName;
    updateUser.lastName = lastName;
    // add more security to password change
    updateUser.password = password;

    this.profileService.postUser(updateUser).subscribe(
      (resp) => {this.user = resp,
        this.editUser = false;
      },
      (err) => console.log(err),
      () => console.log("User profile updated")
    );
    this.editUser
  }

  // this is copied from orders.component.ts, there might be a better way for this but I am unsure
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
