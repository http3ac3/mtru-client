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
import { UserDialogComponent } from '../../user-dialog/user-dialog.component';

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
    public dialog : MatDialog) { }

  onCancel() : void {
    this.dialogRef.close();
  }

  onCategoryDialogOpen() {
    this.dialog.open(CreateCategoryFormDialogComponent);
    this.dialogRef.close();
  }

  onSubcategoryDialogOpen() {
    this.dialog.open(CreateSubcategoryFormDialogComponent);
    this.dialogRef.close();
  }

  onEquipmentDialogOpen() {
    this.dialog.open(CreateEquipmentFormDialogComponent);
    this.dialogRef.close();
  }

  onResponsibleDialogOpen() {
    this.dialog.open(CreateResponsibleFormDialogComponent);
    this.dialogRef.close();
  }

  onPlacementDialogOpen() {
    this.dialog.open(CreatePlacementFormDialogComponent);
    this.dialogRef.close();
  }

  onDepartmentDialogOpen() {
    this.dialog.open(CreateDepartmentFormDialogComponent);
    this.dialogRef.close();
  }

  onUserDialogOpen() {
    this.dialog.open(UserDialogComponent);
    this.dialogRef.close();
  }
}
