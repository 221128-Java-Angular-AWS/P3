import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../models/order';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators'
import { environment } from 'src/environments/environment';

/**
 * This service sends HTTP requests related to orders to the back-end server
 */
@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  constructor(private http: HttpClient) {}

  /**
   * Retrieves all orders belonging to the current user
   * @returns An observable containing the list of orders
   */
  getOrders(): Observable<Order[]>{
    return this.http.get<Order[]>(environment.baseUrl + "/order", {headers: environment.headers, withCredentials: environment.withCredentials})
    .pipe(
      catchError(this.handleError<Order[]>('getOrders', []))
    );
  }

  /**
   * Retrieves a specific order belonging to the current user
   * @param orderId The order being requested
   * @returns An observable containing the order
   */
  getOrder(orderId: number): Observable<Order>{
    return this.http.get<Order>(environment.baseUrl + "/order/" + orderId, {headers: environment.headers, withCredentials: environment.withCredentials})
    .pipe(
      catchError(this.handleError<Order>('getOrder'))
    );
  }

  /**
   * Retrieves the 5 most recent orders belonging to the current user
   * @returns An observable containing a list of the orders
   */
  getOrdersForProfile() {
    return this.http.get<Order[]>(environment.baseUrl + "/order/profile", {headers: environment.headers, withCredentials: environment.withCredentials})
    .pipe(
      catchError(this.handleError<Order[]>('getOrders', []))
    );
  }

  /**
   * Sends a list of products to be persisted in the database as a new order
   * @param products The list of products in the order
   * @returns An observable containing just the response info
   */
  createOrder(products: {id: number, quantity: number}[]): Observable<any>{
    const payload = JSON.stringify(products);
    console.log(payload);
    return this.http.post(environment.baseUrl + "/order", payload, {headers: environment.headers, withCredentials: environment.withCredentials})
    .pipe(
      catchError(this.handleError<Order>('createOrder'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    }
  }
}
