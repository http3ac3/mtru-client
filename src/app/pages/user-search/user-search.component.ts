import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgFor } from '@angular/common';
import { Equipment } from '../../models/equipment/equipment';
import { RentService } from '../../services/rent/rent.service';
import { EquipmentService } from '../../services/equipment/equipment.service';
import { MatDialog } from '@angular/material/dialog';
import { Placement } from '../../models/placement/placement';
import { PlacementService } from '../../services/placement/placement.service';
import { MatDividerModule } from '@angular/material/divider';
import { StorageService } from '../../services/storage/storage.service';
import { Rent } from '../../models/rent/rent';
import { Router } from '@angular/router';
import { MatRadioModule } from '@angular/material/radio';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-user-search',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgFor,
    MatFormFieldModule, 
    MatInputModule, 
    MatButtonModule, 
    MatIconModule,
    MatSelectModule,
    MatRadioModule,
    MatTooltipModule,
    MatDividerModule
  ],
  templateUrl: './user-search.component.html',
  styleUrl: './user-search.component.css'
})
export class UserSearchComponent {
  equipmentData : Equipment[] = [];
  placements : Placement[] = [];

  searchEquipmentForm : FormGroup;
  isInventoryNumberSearchMode = false;
  equipmentInputPlaceholderValue = "Название оборудования";
  modeTooltipText = "Изменить на поиск по инв. номеру";

  constructor(
    private rentService : RentService,
    private placementService : PlacementService, 
    private equipmentService : EquipmentService,
    private storageService : StorageService,
    public dialog : MatDialog,
    private router : Router  
  ) {
    this.searchEquipmentForm = new FormGroup({
      equipment : new FormControl(null, [Validators.required]),
      searchEquipmentValue : new FormControl(),
      placement : new FormControl(null, [Validators.required]),
      searchPlacementValue : new FormControl()
    });
  }

  ngOnInit() {
    if (this.storageService.getUser() == null) {
      alert('Вы не авторизованы!');
      this.router.navigate(['login']);
      return;
    }
    
    let currentUserRoles = this.storageService.getUser().roles;
    
    if (!currentUserRoles.some((r : any) => r.name === 'ROLE_USER')) {
      alert('Вы не имеете роли обычного пользователя для доступа к данной странице!');
      this.router.navigate(['login']);
    }

    this.equipmentService.getAll().subscribe({
      next: (data : Equipment[]) => this.equipmentData = data,
      complete: () => this.searchEquipmentForm.patchValue({ equipment : this.equipmentData[0] })
    });

    this.placementService.getAll().subscribe({
      next: (data : Placement[]) => this.placements = data,
      complete: () => this.searchEquipmentForm.patchValue({ placement : this.placements[0] })
    });
  }

  searchByEquipmentName() {
    let value = this.searchEquipmentForm.value.searchEquipmentValue;
    let param = (this.isInventoryNumberSearchMode) ? { inventoryNumber : value } : { name : value };
    console.log(param)
    this.equipmentService.getAll(param).subscribe({
      next: (data : Equipment[]) => this.equipmentData = data,
      complete: () => this.searchEquipmentForm.patchValue({ equipment : this.equipmentData[0] })
    });
  }

  resetSearch() {
    this.searchEquipmentForm.patchValue({searchEquipmentValue : null});
    this.searchByEquipmentName();
  }

  take() {
    let formValues = this.searchEquipmentForm.value;
    let rent : Rent = new Rent(
      0,
      '',
      formValues.equipment,
      this.storageService.getUser().responsible,
      formValues.placement,
      '',
      formValues.description
    );

    this.rentService.create(rent).subscribe({
      complete: () => { 
        alert(`Взятие оборудования ${rent.equipment.name} (инв. №${rent.equipment.inventoryNumber} было успешно сохранено!)`)
        window.location.reload();
      },
      error: (err) => {
        alert(`Оборудование ${rent.equipment.name} (инв. №${rent.equipment.inventoryNumber}) вынести невозможно!`)
      }
    });
    
  }

  searchByPlacementName(){
    let name = this.searchEquipmentForm.value.searchPlacementValue;
    this.placementService.getAllByNameStartingWith(name).subscribe({
      next: (data : Placement[]) => this.placements = data,
      complete: () => this.searchEquipmentForm.patchValue({ placement : this.placements[0] })
    });
  }

  resetSearchPlacement() {
    this.searchEquipmentForm.patchValue({searchPlacementValue : null});
    this.searchByPlacementName();
  }

  changeSearchMode() {
    this.isInventoryNumberSearchMode = !this.isInventoryNumberSearchMode
    this.equipmentInputPlaceholderValue = 
      (this.isInventoryNumberSearchMode) ? "Инвентарный номер" : "Название оборудования";
    this.modeTooltipText = 
      (this.isInventoryNumberSearchMode) ? "Изменить на поиск по названию" : "Изменить на поиск по инв. номеру";
  }
}
