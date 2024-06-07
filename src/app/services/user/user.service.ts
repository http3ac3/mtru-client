import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';
import { User } from '../../models/user/user';
import { environment } from '../../../enviroments/enviroment';

const USER_API = `${environment.getBaseUrl()}/api/v1/users`

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(public http : HttpClient) { }

  getCurrentUser() : Observable<any> {
    return this.http.get(`${USER_API}/current-user`);
  } 

  getAll() : Observable<User[]> {
    return this.http.get<User[]>(USER_API);
  }

  create(user : User) : Observable<string> {
    return this.http.post(`${environment.getBaseUrl()}/auth/register`, user, {responseType : 'text'});
  } 

  delete(id : number) : Observable<string> {
    return this.http.delete(USER_API + `/${id}`, {responseType: 'text'});
  }
}
