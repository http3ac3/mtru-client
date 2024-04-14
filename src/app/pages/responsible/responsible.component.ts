import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatExpansionModule } from '@angular/material/expansion';
import { MyCustomPaginatorIntl } from '../paginator/paginator.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
import { Responsible } from '../../models/responsible/responsible';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { Department } from '../../models/department/department';
import { MatSelectModule } from '@angular/material/select';
import { DepartmentService } from '../../services/department/department.service';
import { ResponsibleService } from '../../services/responsible/responsible.service';
import { NgFor } from '@angular/common';
import { HttpParams } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { CreateResponsibleFormDialogComponent } from '../create-responsible-form-dialog/create-responsible-form-dialog.component';
import { MatSort, MatSortModule } from '@angular/material/sort';
@Component({
  selector: 'app-responsible',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatIconModule, 
    MatButtonModule, 
    FormsModule, 
    MatInputModule,
    MatFormFieldModule, 
    MatExpansionModule, 
    MatCheckboxModule, 
    MatPaginatorModule,
    MatTableModule,
    MatSelectModule,
    MatRadioModule,
    NgFor,
    MatSortModule
  ],
  templateUrl: './responsible.component.html',
  styleUrl: './responsible.component.css'
})
export class ResponsibleComponent implements AfterViewInit {
  filterForm : FormGroup;

  responsibleData : Responsible[] = [];
  departments : Department[] = [];
  dataSource = new MatTableDataSource<Responsible>(this.responsibleData);
  displayedColumns : string[] = [
    'id', 
    'lastName', 
    'firstName', 
    'patronymic',
    'position',
    'phoneNumber',
    'isFinanciallyResponsible',
    'department'
  ];

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor (
    private fb : FormBuilder,
    private departmentService : DepartmentService,
    private responsibleService : ResponsibleService,
    public dialog : MatDialog
  ) {
    this.filterForm = new FormGroup({
      department : new FormControl(),
      isFinanciallyResponsible : new FormControl()
    })
  }

  ngOnInit() {
    this.paginator._intl = new MyCustomPaginatorIntl;
    this.departmentService.getAll().subscribe({
      next: (data : Department[]) => {
        this.departments = data;
      }
    });

    this.getAllResponsibleData();
  }

  ngAfterViewInit(): void {  
    this.dataSource.paginator = this.paginator; 
    this.dataSource.sort = this.sort;
  }

  applyFilters() {
    let formValues = this.filterForm.value;
    let params = {
      departmentId : null,
      isFinanciallyResponsible : null
    }

    if (formValues.department) { params.departmentId = formValues.department.id };
    if (formValues.isFinanciallyResponsible !== 'none') {
        params.isFinanciallyResponsible = formValues.isFinanciallyResponsible;
    }

    this.responsibleService.getAll(params).subscribe({
      next: (data : Responsible[]) => { 
        this.responsibleData = data; 
      }, 
      complete: () => { this.dataSource.data = this.responsibleData; }
    });
    
  }

  getAllResponsibleData() {
    this.responsibleService.getAll().subscribe({
      next: (data : Responsible[]) => {
        this.responsibleData = data
      },
      complete: () => {
        this.dataSource.data = this.responsibleData;
      }
    })
  }

  searchByName(event : Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  resetFilters() {
    window.location.reload();
  }

  clickRow(row : Responsible) {
    let responsible = {
      id : row.id,
      lastName : row.lastName,
      firstName : row.firstName,
      patronymic : row.patronymic,
      position : row.position,
      phoneNumber : row.phoneNumber,
      financiallyResponsible : row.financiallyResponsible,
      department : row.department
    }
    this.dialog.open(CreateResponsibleFormDialogComponent, {
      data : responsible,
      autoFocus : false
    })
  }
}
