import { AfterViewInit, Component, NgModule, ViewChild } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { Subcategory } from '../../models/subcategory/subcategory';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MyCustomPaginatorIntl } from '../paginator/paginator.component';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { Category } from '../../models/category/category';
import { CategoryService } from '../../services/category/category.service';
import { SubcategoryService } from '../../services/subcategory/subcategory.service';
import { MatDialog } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { NgFor } from '@angular/common';
import { CreateSubcategoryFormDialogComponent } from '../dialogs/create-subcategory-form-dialog/create-subcategory-form-dialog.component';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { StorageService } from '../../services/storage/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-subcategory',
  standalone: true,
  imports: [
    FormsModule,
    MatExpansionModule, 
    MatButtonModule, 
    MatPaginator, 
    MatPaginatorModule, 
    MatTableModule,
    MatSelectModule, 
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatSortModule,
    NgFor
  ],
  templateUrl: './subcategory.component.html',
  styleUrl: './subcategory.component.css'
})
export class SubcategoryComponent implements AfterViewInit {
  categories : Category[] = []
  selectedCategory : any;
  subcategories : Subcategory[] = [];
  dataSource = new MatTableDataSource<Subcategory>(this.subcategories);
  displayedColumns : string[] = ['id', 'name', 'category'];

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor (
    private categoryService : CategoryService,
    private subcategoryService : SubcategoryService,
    public dialog : MatDialog,
    private storageService : StorageService,
    private router : Router
  ) {}

  ngOnInit() {
    if (this.storageService.getUser() == null) {
      alert('Вы не авторизованы!');
      this.router.navigate(['login']);
      return;
    }
    let currentUserRoles = this.storageService.getUser().roles;
    if (!currentUserRoles.some((r : any) => r.name === 'ROLE_ADMIN') && 
      !currentUserRoles.some((r : any) => r.name === 'ROLE_LABHEAD')) {
        alert('Вы не имеете роли администратора или заведующего лабораторией для доступа к данной странице!');
        this.router.navigate(['user-search']);
      }

    this.paginator._intl = new MyCustomPaginatorIntl;

    this.categoryService.getAll().subscribe({
      next: (data : Category[]) => {
        this.categories = data; 
      }
    })

    this.getAllData();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;    
    this.dataSource.sort = this.sort;
  }

  applyFilters() {
    if (this.selectedCategory == undefined) return;
    this.subcategoryService.getByCategory(this.selectedCategory).subscribe({
      next: (data : Subcategory[]) => { this.subcategories = data; },
      complete: () => { this.dataSource.data = this.subcategories; }
    })
  }

  searchByName(event : Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getAllData() {
    this.subcategoryService.getAll().subscribe({
      next: (data : Subcategory[]) => {
        this.subcategories = data;
      },
      complete: () => {
        this.dataSource.data = this.subcategories;
      }
    })
  }

  clickRow(row : Subcategory) {
    let subcategory = {
      id : row.id,
      name : row.name,
      category : row.category
    }
    this.dialog.open(CreateSubcategoryFormDialogComponent, {
      data : subcategory,
      autoFocus : false
    })
  }

  resetFilters() {
    this.getAllData();
    this.selectedCategory = 0;
  }
}
