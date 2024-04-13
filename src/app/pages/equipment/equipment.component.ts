import { AfterViewInit, Component, ViewChild } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
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
import { ResponsibleService } from '../../services/responsible/responsible.service';
import { EquipmentService } from '../../services/equipment/equipment.service';
import { SubcategoryService } from '../../services/subcategory/subcategory.service';
import { MatDialog } from '@angular/material/dialog';
import { PlacementService } from '../../services/placement/placement.service';
import { NgFor } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { CreateEquipmentFormDialogComponent } from '../create-equipment-form-dialog/create-equipment-form-dialog.component';

@Component({
  selector: 'app-equipment',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatPaginatorModule,
    MatButtonModule, 
    FormsModule, 
    MatInputModule, 
    MatFormFieldModule, 
    MatExpansionModule, 
    MatTableModule,
    MatSelectModule,
    NgFor
  ],
  templateUrl: './equipment.component.html',
  styleUrl: './equipment.component.css'
})
export class EquipmentComponent implements AfterViewInit {
  equipmentFilterForm : FormGroup;

  responsibleData : Responsible[] = [];
  placements : Placement[] = [];
  equipmentData : Equipment[] = [];
  subcategories : Subcategory[] = [];

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

  constructor (
    private subcategoryService : SubcategoryService,
    private responsibleService : ResponsibleService,
    private placementService : PlacementService,
    private equipmentService : EquipmentService,
    public dialog : MatDialog
  ) {
    
    this.equipmentFilterForm = new FormGroup({
      initialCostFrom : new FormControl(),
      initialCostTo : new FormControl(),
      commissioningDateFrom : new FormControl(),
      commissioningDateTo : new FormControl(),
      decommissioningDateFrom : new FormControl(),
      decommissioningDateTo : new FormControl(),
      subcategory : new FormControl(),
      responsible : new FormControl(),
      placement : new FormControl()
    });
  }
  ngOnInit() {
    this.paginator._intl = new MyCustomPaginatorIntl;
    this.subcategoryService.getAll().subscribe((data : Subcategory[]) => { this.subcategories = data });
    this.responsibleService.getAll({isFinanciallyResponsible : true}).subscribe(
      (data : Responsible[]) => { this.responsibleData = data }
    );
    this.placementService.getAll().subscribe((data : Placement[]) => { this.placements = data });
    this.getAllEquipmentData();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  getAllEquipmentData() {
    this.equipmentService.getAll().subscribe({
      next: (data : Equipment[]) => { this.equipmentData = data; },
      complete: () => { this.dataSource.data = this.equipmentData; }
    });
  }

  searchByName(event : Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  applyFilters() {
    let formValues = this.equipmentFilterForm.value;
    let params = {
      initialCostFrom : formValues.initialCostFrom,
      initialCostTo : formValues.initialCostTo,
      commissioningDateFrom : formValues.commissioningDateFrom,
      commissioningDateTo : formValues.commissioningDateTo,
      decommissioningDateFrom : formValues.decommissioningDateFrom,
      decommissioningDateTo : formValues.decommissioningDateTo,
      subcategoryId : null,
      responsibleId : null,
      placementId : null
    }

    if (formValues.subcategory != null) params.subcategoryId = formValues.subcategory.id;
    if (formValues.responsible != null) params.responsibleId = formValues.responsible.id;
    if (formValues.placement != null) params.placementId = formValues.placement.id;

    this.equipmentService.getAll(params).subscribe({
      next: (data : Equipment[]) => { this.equipmentData = data },
      complete: () => { this.dataSource.data = this.equipmentData }
    })
  }

  resetFilters() {
    this.equipmentFilterForm.patchValue({
      initialCostFrom : null,
      initialCostTo : null,
      commissioningDateFrom : null,
      commissioningDateTo : null,
      decommissioningDateFrom : null,
      decommissioningDateTo : null,
      subcategory : null,
      responsible : null,
      placement : null
    })
    this.applyFilters();
  }

  clickRow(row : Equipment) {
    let equipment = {
      id : row.id,
      inventoryNumber : row.inventoryNumber,
      name : row.name,
      initialCost : row.initialCost,
      commissioningDate : row.commissioningDate,
      commissioningActNumber : row.commissioningActNumber,
      decommissioningDate : row.decommissioningDate,
      decommissioningActNumber : row.decommissioningActNumber,
      description : row.description,
      subcategory : row.subcategory,
      responsible : row.responsible,
      placement : row.placement,
      imageData : row.imageData
    }
    this.dialog.open(CreateEquipmentFormDialogComponent, {
      data : equipment,
      autoFocus : false
    });
  }
}
