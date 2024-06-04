import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { HeaderComponent } from '../header/header.component';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/Auth/auth.service';
import { StorageService } from '../../services/storage/storage.service';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    HeaderComponent,
    RouterLink,
    NgStyle
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

  constructor (
    private router: Router,
    public authService: AuthService,
    private storageService : StorageService
  ) { }

  ngOnInit() {
    if (this.storageService.getUser() == null) {
      alert('Вы не авторизованы!');
      this.router.navigate(['login']);
      return;
    }
    let currentUserRoles = this.storageService.getUser().roles;
    if (!currentUserRoles.some((r : any) => r.name === 'ROLE_ADMIN') &&
      !currentUserRoles.some((r : any) => r.name === 'ROLE_LABHEAD')) {
        alert('Вы не имеете роли администратора или заведующего лабораторией для доступа к данной странице!');
        this.router.navigate(['user-search']);
    }
  }

  goToEquipment() {
    this.router.navigate(['equipment']);
  }

  goToResponsible() {
    this.router.navigate(['responsible']);
  }

  goToCategories() {
    this.router.navigate(['categories']);
  }

  goToSubategories() {
    this.router.navigate(['subcategories']);
  }

  goToPlacements() {
    this.router.navigate(['placements']);
  }

  goToRents() {
    this.router.navigate(['rents']);
  }

  goToDepartments() {
    this.router.navigate(['departments']);
  }

  goToUsers() {
    this.router.navigate(['users']);
  }
}
