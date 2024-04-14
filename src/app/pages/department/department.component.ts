import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MyCustomPaginatorIntl } from '../paginator/paginator.component';
import { Department } from '../../models/department/department';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { _MatInternalFormField } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DepartmentService } from '../../services/department/department.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateDepartmentFormDialogComponent } from '../dialogs/create-department-form-dialog/create-department-form-dialog.component';
import { MatSort, MatSortModule } from '@angular/material/sort';

@Component({
  selector: 'app-department',
  standalone: true,
  imports: [
    MatTableModule, 
    MatPaginator, 
    MatPaginatorModule, 
    MatButtonModule,
    MatInputModule,
    FormsModule,
    MatFormFieldModule,
    MatSortModule,
  ],
  templateUrl: './department.component.html',
  styleUrl: './department.component.css'
})
export class DepartmentComponent {
  departments : Department[] = [];
  dataSource = new MatTableDataSource<Department>(this.departments);
  displayedColumns : string[] = ['id', 'name'];

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor (
    private departmentService : DepartmentService,
    public dialog : MatDialog
  ) { }
  
  ngOnInit() {
    this.paginator._intl = new MyCustomPaginatorIntl;
    this.departmentService.getAll().subscribe({
      next: (data: Department[]) => {
        this.departments = data
      },
      complete: () => {
        this.dataSource.data = this.departments
      }
    })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  clickRow(row : Department) {
    let department = {
      id : row.id,
      name : row.name
    }
    this.dialog.open(CreateDepartmentFormDialogComponent, {
      data: department,
      autoFocus : false
    })
  }

  searchByName(event : Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
