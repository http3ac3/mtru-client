import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatExpansionModule} from '@angular/material/expansion';
import { PaginatorComponent } from '../paginator/paginator.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { ResponsibleRowComponent } from '../responsible-row/responsible-row.component';
import { HeaderComponent } from '../header/header.component';
@Component({
  selector: 'app-responsible',
  standalone: true,
  imports: [MatToolbarModule, 
    MatIconModule, 
    MatButtonModule, 
    FormsModule, 
    MatInputModule,
    MatFormFieldModule, 
    MatExpansionModule, 
    PaginatorComponent, MatCheckboxModule, ResponsibleRowComponent, HeaderComponent],
  templateUrl: './responsible.component.html',
  styleUrl: './responsible.component.css'
})
export class ResponsibleComponent {

}
