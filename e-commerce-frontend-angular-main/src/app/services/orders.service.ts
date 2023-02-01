import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../models/order';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  currentOrder: Order = new Order();
  constructor(private http: HttpClient) {}

  getOrders(): Observable<Order[]>{
    return this.http.get<Order[]>(environment.baseUrl + "/order", {headers: environment.headers, withCredentials: environment.withCredentials})
    .pipe(
      catchError(this.handleError<Order[]>('getOrders', []))
    );
  }

  getOrder(orderId: number): Observable<Order>{
    return this.http.get<Order>(environment.baseUrl + "/order/" + orderId, {headers: environment.headers, withCredentials: environment.withCredentials})
    .pipe(
      catchError(this.handleError<Order>('getOrders'))
    );
  }

  createOrder(order: Order){
    
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    }
  }
}
