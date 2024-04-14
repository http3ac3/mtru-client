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

  getAll() : Observable<User[]> {
    return this.http.get<User[]>(USER_API);
  }

  create(user : User) : Observable<string> {
    return this.http.post('http://localhost:8080/auth/register', user, {responseType : 'text'});
  } 

  delete(id : number) : Observable<string> {
    return this.http.delete(USER_API + `/${id}`, {responseType: 'text'});
  }
}
