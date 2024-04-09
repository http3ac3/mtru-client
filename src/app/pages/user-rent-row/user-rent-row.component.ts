import { Component } from '@angular/core';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatFormField, MatInput, MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-user-rent-row',
  standalone: true,
  imports: [MatButton, MatButtonModule, MatInput, MatInputModule, MatFormField, MatFormFieldModule],
  templateUrl: './user-rent-row.component.html',
  styleUrl: './user-rent-row.component.css'
})
export class UserRentRowComponent {

}
