import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { CreateCategoryFormDialogComponent } from '../create-category-form-dialog/create-category-form-dialog.component';
import { CreateSubcategoryFormDialogComponent } from '../create-subcategory-form-dialog/create-subcategory-form-dialog.component';
import { CreateEquipmentFormDialogComponent } from '../create-equipment-form-dialog/create-equipment-form-dialog.component';

@Component({
  selector: 'app-create-models-dialog',
  standalone: true,
  imports: [
    MatDialogTitle, 
    MatDialogContent, 
    MatDialogActions, 
    MatDialogClose,
    MatButton],
  templateUrl: './create-models-dialog.component.html',
  styleUrl: './create-models-dialog.component.css'
})
export class CreateModelsDialogComponent {
 
  constructor(public dialogRef: MatDialogRef<CreateModelsDialogComponent>, 
    public categoryDialog : MatDialog, 
    public subcategoryDialog : MatDialog,
    public equipmentDialog : MatDialog) { }
  
  onCancel() : void {
    this.dialogRef.close();
  }

  onCategoryDialogOpen() {
    this.categoryDialog.open(CreateCategoryFormDialogComponent);
    this.dialogRef.close();
  }

  onSubcategoryDialogOpen() {
    this.subcategoryDialog.open(CreateSubcategoryFormDialogComponent);
    this.dialogRef.close();
  }

  onEquipmentDialogOpen() {
    this.equipmentDialog.open(CreateEquipmentFormDialogComponent);
    this.dialogRef.close();
  }
}
