import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { ProfileService } from 'src/app/services/profile.service';
import { OrdersService } from 'src/app/services/orders.service';
import { WishListService } from 'src/app/services/wishList.service';
import { Order } from 'src/app/models/order';
import { Product } from 'src/app/models/product';
import * as bcrypt from 'bcryptjs';

/**
 * The profile component displays a user's basic information and allows the user to change this information
 * The user profile also implements a custom view of the previous orders and the wishlist component
 */

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user?: User;
  editUser: boolean = false;
  orders: Order[] = [];
  products: Product[] = [];

  constructor(
    private profileService: ProfileService,
    private ordersService: OrdersService,
    private wishListService: WishListService,
    private route: ActivatedRoute,
    private router: Router

  ) { }


  /**
   * Retrieve the active user, get the wishlist for the active user, get the most recent orders for the user
   */
  ngOnInit(): void {
    this.profileService.getUser().subscribe(
      (resp) => {
        this.user = resp;
        this.wishListService.getWishListProducts().subscribe(
          (resp) => this.products = resp,
          (err) => console.log(err),
          () => console.log()
        );
      },
      (err) => console.log(err),
      () => console.log()
    );
    this.ordersService.getOrdersForProfile().subscribe(
      (resp) => this.orders = resp,
      (err) => console.log(err),
      () => console.log("Orders retrieved")
      );
  }

  /**
   * Used for the ngIf directive in the template, used to switch between viewing and editing profile
   */
  editMode(): void {
    this.editUser = true;
  }


  /**
   * used to exit edit without posting user update
   */
  cancelEdit(): void {
    this.editUser = false;
  }


  /**
   * Sends a user object to be posted to the server via method in profile.service.ts
   * also checks if password is blank before hashing to prevent posting a hashed null password.
   * @param email string, the user email
   * @param firstName string, the user first name
   * @param lastName string, the user lastname
   * @param password string, the users password, optional, only used if updating password
   */
  save(email: string, firstName: string, lastName: string, password?: string) {
    let updateUser = new User()
    if (this.user != undefined) {
      updateUser.id = this.user.id;
    }

    updateUser.email = email;
    updateUser.firstName = firstName;
    updateUser.lastName = lastName;
    
    if (password != "" && password != undefined) {
      updateUser.password = bcrypt.hashSync(password, 10);
    } 

    this.profileService.postUser(updateUser).subscribe(
      (resp) => {
        if (resp == undefined) {
          alert("Error updating user");
        } else {
          this.user = resp,
          this.editUser = false;
        }
      },
      (err) => console.log(err),
      () => console.log("User profile updated")
    );
    this.editUser
  }

 
  /**
   * Get the total quantity of items in an order
   * @param order the order containing the products
   * @returns the total number of items in the order
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
 * Get the total cost of the products for the order total
 * @param order the order conataining the products
 * @returns the total cost of the products
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
