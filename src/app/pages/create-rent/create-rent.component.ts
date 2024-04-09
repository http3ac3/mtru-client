import { Component } from '@angular/core';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { MatToolbar, MatToolbarModule } from '@angular/material/toolbar';
import { MatIcon, MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-create-rent',
  standalone: true,
  imports: [MatFormField, MatInput, MatToolbar, MatToolbarModule, MatIcon, MatButton, MatButtonModule, MatIconModule, MatLabel ],
  templateUrl: './create-rent.component.html',
  styleUrl: './create-rent.component.css'
})
export class CreateRentComponent {

}
