import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { RentService } from '../../../services/rent/rent.service';
import { Rent } from '../../../models/rent/rent';
import { Responsible } from '../../../models/responsible/responsible';
import { Placement } from '../../../models/placement/placement';
import { Equipment } from '../../../models/equipment/equipment';


@Component({
  selector: 'app-rent-information-dialog',
  standalone: true,
  imports: [ReactiveFormsModule,
    FormsModule,
    MatDialogTitle, 
    MatDialogContent, 
    MatDialogActions, 
    MatFormFieldModule, 
    MatDialogClose,
    MatSelectModule,
    MatCheckboxModule, 
    MatInputModule,
    MatIconModule,
    MatButtonModule,],
  templateUrl: './rent-information-dialog.component.html',
  styleUrl: './rent-information-dialog.component.css'
})
export class RentInformationDialogComponent {
  rentForm : FormGroup;
  constructor (
    @Inject(MAT_DIALOG_DATA) public data : Rent,
    public dialogRef: MatDialogRef<RentInformationDialogComponent>, 
    private rentService : RentService,
  ) {
    this.rentForm = new FormGroup({
      id : new FormControl(),
      createDateTime : new FormControl(),
      endDateTime : new FormControl(),
      responsible : new FormControl(),
      placement : new FormControl(),
      name : new FormControl(),
      inventoryNumber : new FormControl(),
      description : new FormControl(),
    });
  }

  ngOnInit() {
    this.rentForm.patchValue({
      id : this.data.id,
      createDateTime : this.data.createDateTime,
      endDateTime : this.data.endDateTime,
      responsible : 
        this.data.responsible.lastName + ' ' + 
        this.data.responsible.firstName + ' ' + 
        this.data.responsible.patronymic, 
      inventoryNumber : this.data.equipment.inventoryNumber,
      name : this.data.equipment.name,
      description : this.data.description,
      placement : this.data.placement.name
    });
  }


  onCancel() {
    this.dialogRef.close();
  }

  onRentDelete() {
    let rent = this.rentForm.value;
    if (!confirm(`Вы уверены, что хотите удалить выбранное взятие пользователя?`)) return;
    console.log(rent);
    this.rentService.delete(rent.id).subscribe({
      complete: () => {
        alert(`Взятие оборудования ${rent.name} (инв. № ${rent.inventoryNumber}) успешно удалено!`);
        this.dialogRef.close();
        window.location.reload();
      },
      error: (err) => {
        if (err.status == 423) alert('Ошибка! Удалить взятие, пока оно не завершено, невозможно!');
        else alert('Непредвиденная ошибка! Удалить взятие')
      }
    })
  }
}
