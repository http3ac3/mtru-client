import { AfterViewInit, Component, ViewChild } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { MyCustomPaginatorIntl, PaginatorComponent } from '../paginator/paginator.component';
import { MatTable, MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Equipment } from '../../models/equipment/equipment';
import { ResponsibleService } from '../../services/responsible/responsible.service';
import { EquipmentService } from '../../services/equipment/equipment.service';
import { SubcategoryService } from '../../services/subcategory/subcategory.service';
import { MatDialog } from '@angular/material/dialog';
import { PlacementService } from '../../services/placement/placement.service';
import { NgFor } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { CreateEquipmentFormDialogComponent } from '../dialogs/create-equipment-form-dialog/create-equipment-form-dialog.component';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { StorageService } from '../../services/storage/storage.service';
import { Router } from '@angular/router';
import { animate, state, style, transition, trigger } from '@angular/animations';

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
    NgFor,
    MatSortModule
  ],
  animations: [
    trigger('detailExpand', [
      state('collapsed,void', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
  templateUrl: './equipment.component.html',
  styleUrl: './equipment.component.css'
})
export class EquipmentComponent implements AfterViewInit {
  equipmentFilterForm : FormGroup;

  responsibleData : any[] = [];
  placements : any[] = [];
  equipmentData : any[] = [];
  subcategories : any[] = [];

  dataSource = new MatTableDataSource<any>(this.equipmentData);
  displayedColumns = [
    'id',
    'inventoryNumber',
    'name',
    'initialCost',
    'responsible',
    'placement'
  ];
  displayedColumnsWithExpand = [...this.displayedColumns, 'expand'];
  
  expandedEquipment : any;
  expandedEquipmentImage : any;

  loadedEquipmentImages : any[] = [];

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor (
    private subcategoryService : SubcategoryService,
    private responsibleService : ResponsibleService,
    private placementService : PlacementService,
    private equipmentService : EquipmentService,
    public dialog : MatDialog,
    private storageService : StorageService,
    private router : Router
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
    this.subcategoryService.getAll().subscribe((data : any[]) => { this.subcategories = data });
    this.responsibleService.getAll().subscribe(
      (data : any[]) => { this.responsibleData = data }
    );
    this.placementService.getAll().subscribe((data : any[]) => { this.placements = data });
    this.getAllEquipmentData();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getAllEquipmentData() {
    this.equipmentService.getAll().subscribe({
      next: (data : any[]) => { this.equipmentData = data; },
      complete: () => { this.dataSource.data = this.equipmentData; console.log(this.equipmentData)}
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
      next: (data : any[]) => { this.equipmentData = data },
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

  onOpenDialog(row : Equipment) {
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

  onExpand(equipment : any) {
    if (this.expandedEquipment == null) return;
    this.equipmentService.getBase64Image(this.expandedEquipment.id).subscribe({
      next: (data : any) => {
        equipment.imageData = data.imageBase64;
      },
      error: (err) => {
        if (err.status == 400) return;
      }  
    });  
  }

  onQrGenerate(inventoryNumber : string) {
    this.equipmentService.getQrCodeImage(inventoryNumber).subscribe({
      next: (data: any) => {
        let dataType = data.type;
        
        let binaryData = [];
        binaryData.push(data);
        let downloadLink = document.createElement('a');
        downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, {type: dataType}));
        downloadLink.setAttribute('download', inventoryNumber);
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
      }
    })
  } 

  onExport() {
    this.equipmentService.getExportExcelFile().subscribe({
      next: (data: any) => {
        let dataType = data.type;
        console.log(dataType)
        let binaryData = [];
        binaryData.push(data);
        let downloadLink = document.createElement('a');
        downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, {type: dataType}));
        downloadLink.setAttribute('download', "report");
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
      } 
    })
  }
}
