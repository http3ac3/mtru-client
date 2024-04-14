import { Component, ViewChild } from '@angular/core';
import { MyCustomPaginatorIntl, PaginatorComponent } from '../paginator/paginator.component';
import { RentRowComponent } from '../rent-row/rent-row.component';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { HeaderComponent } from '../header/header.component';
import { MatCheckbox, MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { Rent } from '../../models/rent/rent';
import { Equipment } from '../../models/equipment/equipment';
import { Responsible } from '../../models/responsible/responsible';
import { Department } from '../../models/department/department';
import { Placement } from '../../models/placement/placement';
import { Subcategory } from '../../models/subcategory/subcategory';
import { Category } from '../../models/category/category';
import { MatSelectModule } from '@angular/material/select';
import { NgFor } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioButton, MatRadioGroup } from '@angular/material/radio';
import { EquipmentService } from '../../services/equipment/equipment.service';
import { ResponsibleService } from '../../services/responsible/responsible.service';
import { PlacementService } from '../../services/placement/placement.service';
import { RentService } from '../../services/rent/rent.service';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { RentInformationDialogComponent } from '../dialogs/rent-information-dialog/rent-information-dialog.component';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { StorageService } from '../../services/storage/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rent',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule, 
    MatCheckboxModule, 
    MatExpansionModule,
    MatTableModule,
    MatPaginator,
    MatPaginatorModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioGroup,
    MatRadioButton,
    MatIconModule,
    MatSortModule,
    NgFor
  ],
  templateUrl: './rent.component.html',
  styleUrl: './rent.component.css'
})
export class RentComponent {
  rentFilterForm : FormGroup;

  rents : Rent[] = [];
  equipmentData : Equipment[] = [];
  responsibleData : Responsible[] = [];
  placements : Placement[] = [];

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
  @ViewChild(MatSort) sort!: MatSort;

  constructor (
    private equipmentService : EquipmentService,
    private responsibleService : ResponsibleService,
    private placementService : PlacementService,
    private rentService : RentService,
    public dialog : MatDialog,
    private storageService : StorageService,
    private router : Router
  ) {
    this.rentFilterForm = new FormGroup({
      createDateTimeFrom : new FormControl(),
      createDateTimeTo : new FormControl(),
      endDateTimeFrom : new FormControl(),
      endDateTimeTo : new FormControl(),
      isClosed : new FormControl(),
      equipment : new FormControl(),
      responsible : new FormControl(),
      placement : new FormControl(), 

      equipmentSearchValue : new FormControl()
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
    this.equipmentService.getAll().subscribe((data : Equipment[]) => this.equipmentData = data);
    this.placementService.getAll().subscribe((data : Placement[]) => this.placements = data);
    this.responsibleService.getAll().subscribe((data : Responsible[]) => this.responsibleData = data);

    this.rentService.getAll().subscribe({
      next: (data : Rent[]) => this.rents = data,
      complete: () =>  { 
        this.dataSource.data = this.rents
        this.convertRentsStringDatesToISOFormat();
      }
    })
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilters() {
    let formValues = this.rentFilterForm.value;
    let params = {
      createDateTimeFrom : formValues.createDateTimeFrom,
      createDateTimeTo : formValues.createDateTimeTo,
      endDateTimeFrom : formValues.endDateTimeFrom,
      endDateTimeTo : formValues.endDateTimeTo,
      isClosed : formValues.isClosed !== 'none' ? formValues.isClosed : null,
      equipmentId : formValues.equipment ? formValues.equipment.id : null,
      responsibleId : formValues.responsible ? formValues.responsible.id : null,
      placementId : formValues.placement ? formValues.placement.id : null, 
    };

    this.rentService.getAll(params).subscribe({
      next: (data : Rent[]) => this.rents = data,
      complete: () => { 
        this.dataSource.data = this.rents 
        this.convertRentsStringDatesToISOFormat();
      }
    })
  }

  convertRentsStringDatesToISOFormat() {
    for (let rent of this.rents) {
      rent.createDateTime = rent.createDateTime.substring(0, 19);
      rent.endDateTime = rent.endDateTime ? rent.endDateTime.substring(0, 19) : undefined;
    } 
  }

  updateEquipmentSelectBySearch() {
    let equipmentSearchValue = this.rentFilterForm.value.equipmentSearchValue; 
    console.log(equipmentSearchValue);
    this.equipmentService.getAll({inventoryNumber : equipmentSearchValue}).subscribe({
      next: (data : Equipment[]) => this.equipmentData = data
    })
  }

  resetFilters() {
    this.rentFilterForm.patchValue({
      createDateTimeFrom : null,
      createDateTimeTo : null,
      endDateTimeFrom : null,
      endDateTimeTo : null,
      isClosed : null,
      equipment : null,
      responsible : null,
      placement : null,
      equipmentSearchValue : null
    })
    this.updateEquipmentSelectBySearch();
    this.applyFilters();
  }

  clickRow(row : Rent) {
    let rent = {
      id : row.id,
      createDateTime : row.createDateTime,
      endDateTime : row.endDateTime,
      description : row.description,
      equipment : row.equipment,
      responsible : row.responsible,
      placement : row.placement
    }

    this.dialog.open(RentInformationDialogComponent, {
      data : rent,
      autoFocus : false
    });
  }
}
