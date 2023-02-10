import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';
import { catchError } from 'rxjs/operators'

/**
 * The profile service is how the client sends HTTP methods to the server to populate the profile component
 */

@Injectable({
  providedIn: 'root'
})

export class ProfileService {
  
  private profileUrl: string = `${environment.baseUrl}/profile`

  constructor(private http: HttpClient) { }

  
  /**
   * This returns a user object to display the user profile
   * @returns An Observable containing the active user
   */
  public getUser(): Observable<User> {
    const url = this.profileUrl;
    return this.http.get<User>(url, {headers: environment.headers, withCredentials: environment.withCredentials});
  }


  /**
   * This sends a User object with updated user information to the server
   * @param user User object containing the active user
   * @returns Updated User object after changes are posted
   */
  public postUser(user: User): Observable<User> {
    const url = this.profileUrl;
    const payload = JSON.stringify(user);
    return this.http.post<User>(url, payload, {headers: environment.headers, withCredentials: environment.withCredentials})
    .pipe(
      catchError(this.handleError<User>('postUser'))
    );
  }

  // error handling for failed post
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    }
  }
  
}
