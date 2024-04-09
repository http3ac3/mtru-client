import { Component } from '@angular/core';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatToolbar, MatToolbarModule } from '@angular/material/toolbar';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { UserRentRowComponent } from '../user-rent-row/user-rent-row.component';

@Component({
  selector: 'app-user-rents',
  standalone: true,
  imports: [
    MatToolbar,
    MatToolbarModule, 
    MatIcon, 
    MatButton, 
    MatButtonModule, 
    MatIconModule, 
    UserRentRowComponent ],
  templateUrl: './user-rents.component.html',
  styleUrl: './user-rents.component.css'
})
export class UserRentsComponent {

}
