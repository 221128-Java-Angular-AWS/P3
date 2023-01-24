import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})

export class ProfileService {
  
  private profileUrl: string = `${environment.baseUrl}/profile`

  constructor(private http: HttpClient) { }

  // this returns a user object to display the user profile
  // user id is retrieved in the back end from the HttpSession object
  public getUser(): Observable<User> {
    const url = this.profileUrl;
    return this.http.get<User>(url);
  }

  // this posts a user object to update the logged in user
  public postUser(user: User): Observable<User> {
    const url = this.profileUrl;
    const payload = JSON.stringify(user);
    return this.http.post<User>(url, payload, {headers: environment.headers});
  }

  
}
