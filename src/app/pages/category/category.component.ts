import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { MatButton } from '@angular/material/button';
import { CategoryRowComponent } from '../category-row/category-row.component';
import { PaginatorComponent } from '../paginator/paginator.component';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [MatButton, HeaderComponent, CategoryRowComponent, PaginatorComponent],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent {

}
