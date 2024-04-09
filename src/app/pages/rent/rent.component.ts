import { Component } from '@angular/core';
import { PaginatorComponent } from '../paginator/paginator.component';
import { RentRowComponent } from '../rent-row/rent-row.component';
import { MatButton } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { HeaderComponent } from '../header/header.component';
import { MatCheckbox } from '@angular/material/checkbox';

@Component({
  selector: 'app-rent',
  standalone: true,
  imports: [PaginatorComponent, RentRowComponent, HeaderComponent, MatButton, MatCheckbox, MatExpansionModule],
  templateUrl: './rent.component.html',
  styleUrl: './rent.component.css'
})
export class RentComponent {

}
