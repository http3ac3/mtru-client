import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButton, MatButtonModule } from '@angular/material/button';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInput, MatInputModule } from '@angular/material/input';
import { Placement } from '../../models/placement/placement';
import { PlacementService } from '../../services/placement/placement.service';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-create-placement-form-dialog',
  standalone: true,
  imports: [ 
    FormsModule,
    MatDialogTitle, 
    MatDialogContent, 
    MatDialogActions,
    MatDialogClose,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
  ],
  templateUrl: './create-placement-form-dialog.component.html',
  styleUrl: './create-placement-form-dialog.component.css'
})
export class CreatePlacementFormDialogComponent {
  placement : Placement = { id : 0, name : "" };
  dialogHeader = "Новое помещение";
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public data : Placement,
    public dialogRef: MatDialogRef<CreatePlacementFormDialogComponent>,
    private placementService : PlacementService
  ) { }

  ngOnInit() {
    if (this.data) {
      this.dialogHeader = "Подробные сведения";
      this.placement = this.data;
    }
  }

  onCancel() : void {
    this.dialogRef.close();
  }

  onPlacementCreate() { 
    this.placement.name = this.placement.name.trim();
    this.placementService.create(this.placement).subscribe({
      complete: () => {
        alert(`Помещение ${this.placement.name} было успешно сохранено!`)
        this.dialogRef.close();
        window.location.reload();
      },
      error: (err) => {
        console.log(err.status === 400);
        alert('Такое помещение уже существует');
      }
    });
  }

  onPlacementChange() {
    this.placement.name = this.placement.name.trim();
    this.placementService.update(this.placement).subscribe({
      complete: () => {
        alert('Данные были успешно обновлены!');
        this.dialogRef.close();
        window.location.reload();
      },
      error: (err) => {
        alert('Такое помещение уже существует');
      }
    });
  }

  onPlacementDelete() {
    this.placementService.delete(this.placement.id).subscribe({
      complete: () => {
        alert('Данные были успешно удалены!');
        this.dialogRef.close();
        window.location.reload();
      },
      error: (err) => {
        if (err.status === 404) {
          alert('Данной категории не существует!');
        } else if (err.status === 409) {
          alert('Помещение не может быть удалено: за ним закреплены другое оборудование или взятия!');
        } else {
          alert('Непредвиденная ошибка! Удалить помещение невозможно');
        }
      }
    });
  }
}
