import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatButton } from '@angular/material/button';
import { MyCustomPaginatorIntl, PaginatorComponent } from '../paginator/paginator.component';
import { Category } from '../../models/category/category';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { CategoryService } from '../../services/category/category.service';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { CreateCategoryFormDialogComponent } from '../create-category-form-dialog/create-category-form-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [
    MatButton, 
    PaginatorComponent,  
    MatTableModule, 
    MatPaginator, 
    MatPaginatorModule, 
    MatIconModule,
    MatFormFieldModule, 
    MatInputModule
  ],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent implements AfterViewInit{ 
  categories : Category[] = [];
  dataSource = new MatTableDataSource<Category>(this.categories);
  displayedColumns : string[] = ['id', 'name'];

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(private categoryService: CategoryService, private dialog : MatDialog) { }

  ngOnInit() {
    this.paginator._intl = new MyCustomPaginatorIntl;
    this.categoryService.getAll().subscribe({
      next: (data: Category[]) => {
        this.categories = data;
      },
      complete: () => {
        this.dataSource.data = this.categories;
      }  
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  clickRow(row: Category) {
    /* объявление объекта category связано с тем, что при передаче в качестве data
       объекта row в родительской таблице при изменении значения в поле input в таблице также изменяется */
    let category = {
      id : row.id,
      name : row.name
    };
    this.dialog.open(CreateCategoryFormDialogComponent, {
      data: category,
      autoFocus: false
    });
  }

  searchByName(event : Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
