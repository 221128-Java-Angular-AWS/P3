import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable} from 'rxjs';
import { Product } from '../models/product';
import { environment } from 'src/environments/environment';
import { EMPTY } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

/**
 * This class contains all of the necessary methods to interact with the product
 * data held in the spring back-end
 */
export class ProductService {

  private productUrl: string = "/api/product";

  constructor(private http: HttpClient) { }

  /**
   * Sends the request to retrieve all products
   * @returns List of all products
   */
  public getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(environment.baseUrl+this.productUrl, {headers: environment.headers, withCredentials: environment.withCredentials});
  }

  /**
   * Sends a request for a single product
   * @param id product id
   * @returns Single product that cointains the same "id"
   */
  public getSingleProduct(id: number): Observable<Product> {
    return this.http.get<Product>(environment.baseUrl+this.productUrl+'/'+id, {headers: environment.headers, withCredentials: environment.withCredentials});
  }

  // purchases the cart
  public purchase(products: {id:number, quantity:number}[]): Observable<any> {
    const payload = JSON.stringify(products);
    return this.http.patch<Product[]>(environment.baseUrl+this.productUrl, payload, {headers: environment.headers, withCredentials: environment.withCredentials}
    );
  }

  /**
   * Sends a request for all products with a matching genre excluding the id
   * @param genre product genre
   * @param id product id
   * @returns List of products with the same "genre" excluding one with the 
   * matching "id", this list will be randomly sorted on each load
   */
  public getProductByGenre(genre: string | undefined, id: number): Observable<Product[]> {

    if (genre == undefined) {
      return EMPTY;
    }

    return this.http.get<Product[]>(environment.baseUrl+this.productUrl+"/genre", {headers: environment.headers, withCredentials: environment.withCredentials, params:{genre: genre, id: id}});
  }

  /**
   * Sends a request for all products containing the "name" string in their name
   * @param name searched string
   * @returns List of products that contain "name" in their name
   */
  public searchProduct(name: string): Observable<Product[]> {

    let queryParams = new HttpParams();
    queryParams = queryParams.append("name", name);

    return this.http.get<Product[]>(environment.baseUrl+this.productUrl+"/search", {headers: environment.headers, withCredentials: environment.withCredentials, params:queryParams});
  }

  // retrieves the cart from the backend
  public getCart2(id: number): Observable<Product[]>{
    let queryParams = new HttpParams();
    queryParams = queryParams.append("userId", id);
    return this.http.get<any>(environment.baseUrl+this.productUrl+"/cart", {params:queryParams, headers: environment.headers, withCredentials: environment.withCredentials});
  }

  // adds a product to the cart
  public addCart(userId: number, productId: number, quantity: number){
    let queryParams = new HttpParams();
    queryParams = queryParams.append("userId", userId);
    queryParams = queryParams.append("prodId", productId);
    queryParams = queryParams.append("quantity", quantity);
    return this.http.post<any>(environment.baseUrl+this.productUrl+"/cart",{}, {params:queryParams, headers: environment.headers, withCredentials: environment.withCredentials});
  }

  // retrieves a single cart product
  public getSingleCartProduct(id: number): Observable<Product> {
    return this.http.get<Product>(environment.baseUrl+this.productUrl+"/cart"+"/"+id, {headers: environment.headers, withCredentials: environment.withCredentials});
  }

  // empties the cart
  public emptyCart(id: number){
    let queryParams = new HttpParams();
    queryParams = queryParams.append("userId", id);
    console.log('empty cart');
    return this.http.delete<any>(environment.baseUrl + this.productUrl + "/cart", {params: queryParams, headers: environment.headers, withCredentials: environment.withCredentials})
  }

  // removes a cart item
  public removeCartItem(userId: number, productId: number){
    let queryParams = new HttpParams();
    queryParams = queryParams.append("prodId", productId);
    return this.http.delete<any>(environment.baseUrl+this.productUrl+"/cart" + "/" + userId, {params: queryParams, headers: environment.headers, withCredentials: environment.withCredentials});
  }

  // retrives the userid from http session
  public getUserId(){
    return this.http.get<number>(environment.baseUrl+this.productUrl+"/cart" + "/user", {headers: environment.headers, withCredentials: environment.withCredentials});
  }
}

