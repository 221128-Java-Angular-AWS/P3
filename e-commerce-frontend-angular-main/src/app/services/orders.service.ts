import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../models/order';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators'
import { environment } from 'src/environments/environment';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
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
      catchError(this.handleError<Order>('getOrder'))
    );
  }

  createOrder(products: {id: number, quantity: number}[]): Observable<any>{
    const payload = JSON.stringify(products);
    console.log(payload);
    console.log(environment.baseUrl + "/order");
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

  ping(): Observable<string> {
    console.log("Attempting to ping!")
    return this.http.get<string>("http://localhost:8080"+"/review/ping").pipe(
      catchError(this.handleError<string>('ping'))
    );
  }
}
