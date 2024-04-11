import { Component, ViewChild } from '@angular/core';
import { MyCustomPaginatorIntl, PaginatorComponent } from '../paginator/paginator.component';
import { RentRowComponent } from '../rent-row/rent-row.component';
import { MatButton } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { HeaderComponent } from '../header/header.component';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { Rent } from '../../models/rent/rent';
import { Equipment } from '../../models/equipment/equipment';
import { Responsible } from '../../models/responsible/responsible';
import { Department } from '../../models/department/department';
import { Placement } from '../../models/placement/placement';
import { Subcategory } from '../../models/subcategory/subcategory';
import { Category } from '../../models/category/category';

@Component({
  selector: 'app-rent',
  standalone: true,
  imports: [
    MatButton, 
    MatCheckbox, 
    MatExpansionModule,
    MatTableModule,
    MatPaginator,
    MatPaginatorModule  
  ],
  templateUrl: './rent.component.html',
  styleUrl: './rent.component.css'
})
export class RentComponent {
  rents : Rent[] = [
    new Rent(1, '15-01-2023 12:35',
      new Equipment(1, '00000001', 'Стул', 5400.00, '12-01-2023', 'АМТС-001', 
        new Responsible(1, 'Заплаткин', 'Юрий', 'Александрович', 'ПРЕП', '7999999999', true, new Department(1, 'КИТП')),
        new Subcategory(1, 'Какашка', new Category(1, 'КАКАШКИ')), new Placement(1, '303-3')),
        new Responsible(1, 'Заплаткин', 'Юрий', 'Александрович', 'ПРЕП', '7999999999', false, new Department(1, 'КИТП')),
        new Placement(1, '303-3')
     )
  ];
  dataSource = new MatTableDataSource<Rent>(this.rents);
  displayedColumns : string[] = [
    'id',
    'createDateTime',

    'equipment',
    'responsible',
    'placement',
    'endDateTime',
  ];

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  ngOnInit() {
    this.paginator._intl = new MyCustomPaginatorIntl;
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
}
