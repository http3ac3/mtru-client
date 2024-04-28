import { Injectable } from '@angular/core';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AccessService {
  
  constructor(private storageService : StorageService) {}

  isAuthorized() : boolean {
    return this.storageService.getUser() != null;
  }

  isAdmin() : boolean {
    let userRoles = this.storageService.getUser().roles;
    return userRoles.some((r : any) => r.name === 'ROLE_ADMIN');
  }

  isLabhead() : boolean {
    let userRoles = this.storageService.getUser().roles;
    return userRoles.some((r : any) => r.name === 'ROLE_LABHEAD');
  }

  isUser() : boolean {
    let userRoles = this.storageService.getUser().roles;
    return userRoles.some((r : any) => r.name === 'ROLE_USER');
  }
}
