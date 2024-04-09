import { Component } from '@angular/core';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { MatToolbar, MatToolbarModule } from '@angular/material/toolbar';
import { MatIcon, MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-user-search',
  standalone: true,
  imports: [MatFormField, MatInput, MatToolbar, MatToolbarModule, MatIcon, MatButton, MatButtonModule, MatIconModule, MatLabel ],
  templateUrl: './user-search.component.html',
  styleUrl: './user-search.component.css'
})
export class UserSearchComponent {

}
