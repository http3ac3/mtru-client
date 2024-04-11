import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { CategoryServiceService } from '../../services/Category/category-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-category-form-dialog',
  standalone: true,
  imports: [FormsModule,
    MatDialogTitle, 
    MatDialogContent, 
    MatDialogActions, 
    MatFormField, 
    MatLabel, 
    MatDialogClose,
    MatInput,
    MatButton],
  templateUrl: './create-category-form-dialog.component.html',
  styleUrl: './create-category-form-dialog.component.css'
})
export class CreateCategoryFormDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<CreateCategoryFormDialogComponent>, 
    public categoryService : CategoryServiceService,
    public router : Router) { }
  category = {
    name : ""
  }
  
  onCancel() : void {
    this.dialogRef.close();
  }
  
  onSubmit() {
    console.log(this.category);
    this.categoryService.createCategory(this.category).subscribe();
    this.dialogRef.close();
    this.router.navigate(["categories"]);
  }
}
