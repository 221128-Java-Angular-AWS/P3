import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Product } from '../models/product';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators'
import { ProfileService } from './profile.service';

@Injectable({
  providedIn: 'root'
})
export class WishListService {

  constructor(private http: HttpClient) { }

  private wishListUrl: string = "/wishlist";

  public getWishListProducts(userId: Number): Observable<Product[]> {
    let userIdUrl = `/${userId}`;
    return this.http.get<Product[]>(environment.baseUrl+this.wishListUrl + userIdUrl, {headers: environment.headers, withCredentials: environment.withCredentials});
  }

  public removeFromWishList(productId: Number, userId: Number): Observable<Object> {
    console.log("Found wishlist service");
    let productIdUrl = `/${productId}`;
    let userIdUrl = `/${userId}`;
    console.log(`Attempting to delete product ${productId} of user ${userId}`);
    console.log("Sending HTTP Delete request to: " + environment.baseUrl + this.wishListUrl + userIdUrl + productIdUrl);
    return this.http.delete(environment.baseUrl + this.wishListUrl + userIdUrl + productIdUrl, {headers: environment.headers, withCredentials: environment.withCredentials})
    .pipe(
      catchError(this.handleError<Product>('removeWishListItem'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    }
  }
}