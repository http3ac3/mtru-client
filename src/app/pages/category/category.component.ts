import { AfterViewInit, Component, ViewChild } from '@angular/core';
import {MatTable, MatTableDataSource, MatTableModule} from '@angular/material/table';
import { HeaderComponent } from '../header/header.component';
import { MatButton } from '@angular/material/button';
import { CategoryRowComponent } from '../category-row/category-row.component';
import { MyCustomPaginatorIntl, PaginatorComponent } from '../paginator/paginator.component';
import { CategoryServiceService } from '../../services/Category/category-service.service';
import { Category } from '../../models/category/category';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [MatButton, PaginatorComponent, MatTable, MatTableModule, MatPaginator, MatPaginatorModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent implements AfterViewInit{ 
  categories : Category[] = [];
  dataSource = new MatTableDataSource<Category>(this.categories);
  displayedColumns : string[] = ['id', 'name'];

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  ngOnInit() {
    this.paginator._intl = new MyCustomPaginatorIntl;
    // this.categoryService.getCategories().subscribe({next:(data: any[]) => this.categories = data});
  }

  ngAfterViewInit() {
    
    this.dataSource.paginator = this.paginator;
  }
}
