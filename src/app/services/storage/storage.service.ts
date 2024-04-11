import { Injectable } from '@angular/core';
import { User } from '../../models/user/user';

const USER_KEY = "auth-user";
const TOKEN_KEY = "token";


@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  clear() : void {
    window.localStorage.clear();
  }

  public saveToken(token : string) {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.setItem(TOKEN_KEY, token);
  }

  public saveUser(user : User) {
    localStorage.removeItem(USER_KEY);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser() : any{
    const user = localStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }
    return null;
  }

  public isLoggedIn(): boolean {
    const user = localStorage.getItem(USER_KEY);
    if (user) {
      return true;
    }
    return false;
  }
}
