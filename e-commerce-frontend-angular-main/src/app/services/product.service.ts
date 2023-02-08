import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Product } from '../models/product';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators'
import { CartComponent } from '../components/cart/cart.component';
import { EMPTY } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private productUrl: string = "/api/product";

  constructor(private http: HttpClient) { }

  public getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(environment.baseUrl+this.productUrl, {headers: environment.headers, withCredentials: environment.withCredentials});
  }

  public getSingleProduct(id: number): Observable<Product> {
    return this.http.get<Product>(environment.baseUrl+this.productUrl+'/'+id, {headers: environment.headers, withCredentials: environment.withCredentials});
  }

  public purchase(products: {id:number, quantity:number}[]): Observable<any> {
    const payload = JSON.stringify(products);
    return this.http.patch<Product[]>(environment.baseUrl+this.productUrl, payload, {headers: environment.headers, withCredentials: environment.withCredentials}
    );
  }

  public getProductByGenre(genre: string | undefined, id: number): Observable<Product[]> {

    if (genre == undefined) {
      return EMPTY;
    }

    return this.http.get<Product[]>(environment.baseUrl+this.productUrl+"/genre", {headers: environment.headers, withCredentials: environment.withCredentials, params:{genre: genre, id: id}});
  }

  public searchProduct(name: string): Observable<Product[]> {

    let queryParams = new HttpParams();
    queryParams = queryParams.append("name", name);

    return this.http.get<Product[]>(environment.baseUrl+this.productUrl+"/search", {headers: environment.headers, withCredentials: environment.withCredentials, params:queryParams});
  }

  public getCart2(id: number): Observable<Product[]>{
    let queryParams = new HttpParams();
    queryParams = queryParams.append("userId", id);
    return this.http.get<any>(environment.baseUrl+this.productUrl+"/cart", {params:queryParams, headers: environment.headers, withCredentials: environment.withCredentials});
  }

  public addCart(userId: number, productId: number, quantity: number){
    let queryParams = new HttpParams();
    queryParams = queryParams.append("userId", userId);
    queryParams = queryParams.append("prodId", productId);
    queryParams = queryParams.append("quantity", quantity);
    return this.http.post<any>(environment.baseUrl+this.productUrl+"/cart",{}, {params:queryParams, headers: environment.headers, withCredentials: environment.withCredentials});
  }

  public getSingleCartProduct(id: number): Observable<Product> {
    return this.http.get<Product>(environment.baseUrl+this.productUrl+"/cart"+"/"+id, {headers: environment.headers, withCredentials: environment.withCredentials});
  }

  public emptyCart(id: number){
    let queryParams = new HttpParams();
    queryParams = queryParams.append("userId", id);
    console.log('empty cart');
    return this.http.delete<any>(environment.baseUrl + this.productUrl + "/cart", {params: queryParams, headers: environment.headers, withCredentials: environment.withCredentials})
  }

  public removeCartItem(userId: number, productId: number){
    let queryParams = new HttpParams();
    queryParams = queryParams.append("prodId", productId);
    return this.http.delete<any>(environment.baseUrl+this.productUrl+"/cart" + "/" + userId, {params: queryParams, headers: environment.headers, withCredentials: environment.withCredentials});
  }

  public getUserId(){
    return this.http.get<number>(environment.baseUrl+this.productUrl+"/cart" + "/user", {headers: environment.headers, withCredentials: environment.withCredentials});
  }
}

