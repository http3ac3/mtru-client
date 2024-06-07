import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../../enviroments/enviroment';

const AUTH_URL = `${environment.getBaseUrl()}/auth`;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  authSubject = new BehaviorSubject<any>({
    user : null
  });

  login(username : string, password : string):Observable<any> {
    return this.http.post<any>(`${AUTH_URL}/sign-in`, {username, password});
  }

  getUserProfile():Observable<any> {
    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     Authorization: `Bearer ${localStorage.getItem('token')}`
    //   })
    // };

    // console.log(headers.get("Authorization"))
    return this.http.post<any>(`${environment.getBaseUrl()}/api/v1/users/current-user`, null).pipe(
      tap((user) => {
        const currentState = this.authSubject.value;
        this.authSubject.next({...currentState, user});
      })
    )
  }

  logout() {
    localStorage.clear();
  }
}
