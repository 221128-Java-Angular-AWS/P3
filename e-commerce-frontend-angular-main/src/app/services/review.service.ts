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
  private reviewsUrl: string = `${environment.baseUrl}/review`

  
  constructor(private httpClient: HttpClient) { }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error:any): Observable<T> => { console.error(error);
    return of(result as T);}
  }

  getReview(orderId: number): Observable<Review> {
    return this.httpClient.get<Review>(this.reviewsUrl + "/" + orderId, {headers: environment.headers, withCredentials: environment.withCredentials}).pipe(
      catchError(this.handleError<Review>('getReview'))
    )
  }
  postReview(review: Review): Observable<any> {
    const payload = review;
    return this.httpClient.post(environment.baseUrl +"/review", payload, {headers: environment.headers, withCredentials: environment.withCredentials}).pipe(catchError(this.handleError<Review>('postReview'))
    );
  }
}
