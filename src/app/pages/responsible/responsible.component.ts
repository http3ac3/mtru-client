import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatExpansionModule } from '@angular/material/expansion';
import { MyCustomPaginatorIntl } from '../paginator/paginator.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Responsible } from '../../models/responsible/responsible';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
@Component({
  selector: 'app-responsible',
  standalone: true,
  imports: [
    MatToolbarModule, 
    MatIconModule, 
    MatButtonModule, 
    FormsModule, 
    MatInputModule,
    MatFormFieldModule, 
    MatExpansionModule, 
    MatCheckboxModule, 
    MatPaginatorModule,
    MatTableModule
  ],
  templateUrl: './responsible.component.html',
  styleUrl: './responsible.component.css'
})
export class ResponsibleComponent implements AfterViewInit {
  responsibleData : Responsible[] = [];
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

  ngOnInit() {
    this.paginator._intl = new MyCustomPaginatorIntl;
  }

  ngAfterViewInit(): void {  
    this.dataSource.paginator = this.paginator;
  }
}
