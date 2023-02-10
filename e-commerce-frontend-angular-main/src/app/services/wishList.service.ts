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

  // Gets current user's wishlist. Note that this returns a collection of Product objects, not WishList objects
  public getWishListProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(environment.baseUrl+this.wishListUrl, {headers: environment.headers, withCredentials: environment.withCredentials})
    .pipe(
      catchError(this.handleError<Product[]>('getWishListProduct'))
    );
  }

  // Removes item from current user's wishlist
  public removeFromWishList(productId: Number): Observable<Object> {
    let productIdUrl = `/${productId}`;
    return this.http.delete(environment.baseUrl + this.wishListUrl + productIdUrl, {headers: environment.headers, withCredentials: environment.withCredentials})
    .pipe(
      catchError(this.handleError<Product>('removeWishListItem'))
    );
  }

  // Adds item to current user's wishlist
  public addToWishList(productId: Number): Observable<Object> {
    let productIdUrl = `/${productId}`;
    return this.http.post(environment.baseUrl + this.wishListUrl + productIdUrl, {}, {headers: environment.headers, withCredentials: environment.withCredentials})
    .pipe(
      catchError(this.handleError<Product>('addWishListItem'))
    );
  }

  // Checks to see if item is present on current user's wishlist to determine
  // which buttons should be rendered
  public checkIfWishListed(productId: Number): Observable<Object> {
    let productIdUrl = `/${productId}`;
    return this.http.get(environment.baseUrl + this.wishListUrl + productIdUrl, {headers: environment.headers, withCredentials: environment.withCredentials})
    .pipe(
      catchError(this.handleError<Product>('addWishListItem'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    }
  }
}
