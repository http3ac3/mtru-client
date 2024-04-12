import { Component, Inject, OnInit } from '@angular/core';
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
import { CreateResponsibleFormDialogComponent } from '../create-responsible-form-dialog/create-responsible-form-dialog.component';
import { CreatePlacementFormDialogComponent } from '../create-placement-form-dialog/create-placement-form-dialog.component';
import { CreateDepartmentFormDialogComponent } from '../create-department-form-dialog/create-department-form-dialog.component';

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
 
  constructor(
    @Inject(MAT_DIALOG_DATA) public data:any,
    public dialogRef: MatDialogRef<CreateModelsDialogComponent>, 
    public categoryDialog : MatDialog, 
    public subcategoryDialog : MatDialog,
    public equipmentDialog : MatDialog,
    public responsibleDialog : MatDialog,
    public placementDialog : MatDialog,
    public departmentDialog : MatDialog) { }

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

  onResponsibleDialogOpen() {
    this.responsibleDialog.open(CreateResponsibleFormDialogComponent);
    this.dialogRef.close();
  }

  onPlacementDialogOpen() {
    this.placementDialog.open(CreatePlacementFormDialogComponent);
    this.dialogRef.close();
  }

  onDepartmentDialogOpen() {
    this.departmentDialog.open(CreateDepartmentFormDialogComponent);
    this.dialogRef.close();
  }
}
