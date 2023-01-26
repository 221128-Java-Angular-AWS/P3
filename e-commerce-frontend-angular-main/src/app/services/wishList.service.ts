import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../models/product';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WishListService {

  constructor(private http: HttpClient) { }

  private wishListUrl: string = "/wishlist";

  public getWishListProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(environment.baseUrl+this.wishListUrl, {headers: environment.headers, withCredentials: environment.withCredentials});
  }
}
