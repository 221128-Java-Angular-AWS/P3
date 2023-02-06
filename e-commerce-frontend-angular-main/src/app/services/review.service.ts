import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { Product } from '../models/product';
import { User } from '../models/user';
import { Review } from '../models/review.model';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  
  
  constructor(private httpClient: HttpClient) { }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error:any): Observable<T> => { console.error(error);
    return of(result as T);}
  }

  getReview(orderId: number): Observable<Review[]> {
    let temp =  this.httpClient.get<Review[]>(environment.baseUrl + "/review/" + orderId, {headers: environment.headers, withCredentials: environment.withCredentials}).pipe(
      catchError(this.handleError<Review[]>('getReview'))
    )
    return temp;
  }
  postReview(review: Review): Observable<any> {
    const payload = JSON.stringify(review);
    console.log(environment.baseUrl +"/review");
    return this.httpClient.post(environment.baseUrl +"/review/add", review, {headers: environment.headers, withCredentials: environment.withCredentials}).pipe(catchError(this.handleError<Review>('postReview'))
    );
  }
/*
  getAverageReview(product: Product): Observable<number> {
    let num = this.httpClient.get<number>(environment.baseUrl + "/review/avg/" + product.id, {headers: en})
  }

  */

  ping(): Observable<string> {
    console.log("Attempting to ping!")
    return this.httpClient.get<string>("http://localhost:8080"+"/review/ping").pipe(
      catchError(this.handleError<string>('ping'))
    );
  }


}
