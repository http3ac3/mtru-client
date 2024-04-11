import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { HeaderComponent } from '../header/header.component';
import { Router } from '@angular/router';
import { AuthService } from '../../services/Auth/auth.service';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [MatToolbarModule, MatIconModule, MatButtonModule, FormsModule, MatInputModule, MatFormFieldModule, HeaderComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {
  
  constructor (private router: Router, public authService: AuthService) {
    
  }

  ngOnInit() {
    
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
}
