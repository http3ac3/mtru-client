import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MyCustomPaginatorIntl } from '../paginator/paginator.component';
import { Department } from '../../models/department/department';

@Component({
  selector: 'app-department',
  standalone: true,
  imports: [MatTableModule, MatPaginator, MatPaginatorModule, MatButtonModule],
  templateUrl: './department.component.html',
  styleUrl: './department.component.css'
})
export class DepartmentComponent {
  departments : Department[] = [new Department(1, "КИТП")];
  dataSource = new MatTableDataSource<Department>(this.departments);
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
