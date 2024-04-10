import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';
import { User } from '../../models/user/user';

const USER_API = 'http://localhost:8080/api/v1/users'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(public http : HttpClient) { }

  getCurrentUser() : Observable<User> {
    return this.http.get(`${USER_API}/current-user`).pipe(
      map( (data : any) => {
        return new User(data.id, data.username, '', data.responsible, data.roles) 
      })
    );
  } 
}
