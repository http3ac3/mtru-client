import { AfterViewInit, Component, ViewChild } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatExpansionModule} from '@angular/material/expansion';
import { EquipmentRowComponent } from '../equipment-row/equipment-row.component';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { MyCustomPaginatorIntl, PaginatorComponent } from '../paginator/paginator.component';
import { HeaderComponent } from '../header/header.component';
import { MatTable, MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Equipment } from '../../models/equipment/equipment';
import { Responsible } from '../../models/responsible/responsible';
import { Department } from '../../models/department/department';
import { Subcategory } from '../../models/subcategory/subcategory';
import { Category } from '../../models/category/category';
import { Placement } from '../../models/placement/placement';

@Component({
  selector: 'app-equipment',
  standalone: true,
  imports: [
    MatToolbarModule, 
    MatPaginatorModule,
    MatIconModule, 
    MatButtonModule, 
    FormsModule, 
    MatInputModule, 
    MatFormFieldModule, 
    MatExpansionModule, 
    MatTableModule
  ],
  templateUrl: './equipment.component.html',
  styleUrl: './equipment.component.css'
})
export class EquipmentComponent implements AfterViewInit {
  equipmentData : Equipment[] = [
    new Equipment(1, '00000001', 'Стул', 5400.00, '12-01-2023', 'АМТС-001', 
      new Responsible(1, 'Заплаткин', 'Юрий', 'Александрович', 'ПРЕП', '7999999999', true, 
        new Department(1, 'КИТП')
      ),
      new Subcategory(1, 'Какашка', new Category('КАКАШКИ', 1)),
      new Placement(1, '303-3')
    )
  ];
  dataSource = new MatTableDataSource<Equipment>(this.equipmentData);
  displayedColumns : string[] = [
    'id',
    'inventoryNumber',
    'name',
    'initialCost',
    'responsible',
    'placement'
  ];

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  ngOnInit() {
    this.paginator._intl = new MyCustomPaginatorIntl;
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
}
