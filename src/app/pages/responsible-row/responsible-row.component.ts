import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {MatInput, MatInputModule} from '@angular/material/input';
import {MatFormField, MatFormFieldModule} from '@angular/material/form-field';
import {MatCheckboxModule} from '@angular/material/checkbox';

@Component({
  selector: 'app-responsible-row',
  standalone: true,
  imports: [MatFormField, MatFormFieldModule, MatInputModule, MatInput, MatCheckboxModule],
  templateUrl: './responsible-row.component.html',
  styleUrl: './responsible-row.component.css'
})
export class ResponsibleRowComponent {

}
