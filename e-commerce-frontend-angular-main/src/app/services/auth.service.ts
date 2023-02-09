import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

/**
 * Sends HTTP requests related to authentication and registration to the back-end server
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authUrl: string = `${environment.baseUrl}/auth`;
  loggedIn: boolean = false;

  constructor(private http: HttpClient) { }

  /**
   * Sends login information to be authenticated
   * @param email the email of the user trying to log in
   * @param password the password to be authenticated
   * @returns an observable containing response info
   */
  login(email: string, password: string): Observable<any> {
    const payload = {email:email, password:password};
    console.log(payload);
    return this.http.post<any>(`${this.authUrl}/login`, JSON.stringify(payload), {headers: environment.headers, withCredentials: environment.withCredentials});
  }

  /**
   * sends a logout request to remove the current user from the session
   */
  logout(): void{
    this.http.post(`${this.authUrl}/logout`, null);
  }

  /**
   * Registers a new account using the inputted information
   * @param firstName First name of the new user
   * @param lastName Last name of the new user
   * @param email Email that the new user will use to log in
   * @param password Password that the new user will use to log in
   * @returns Observable containing response info
   */
  register(firstName: string, lastName: string, email: string, password: string): Observable<any> {
    const payload = {firstName: firstName, lastName: lastName, email: email, password: password};
    return this.http.post<any>(`${this.authUrl}/register`, JSON.stringify(payload), {headers: environment.headers});
  }
}
