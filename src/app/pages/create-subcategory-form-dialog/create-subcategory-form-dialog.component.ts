import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
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
import { MatOption, MatSelect, MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-create-subcategory-form-dialog',
  standalone: true,
  imports: [FormsModule,
    MatDialogTitle, 
    MatDialogContent, 
    MatDialogActions, 
    MatFormField, 
    MatLabel, 
    MatDialogClose,
    MatInput,
    MatButton, MatSelect, MatSelectModule, MatOption, MatOptionModule],
  templateUrl: './create-subcategory-form-dialog.component.html',
  styleUrl: './create-subcategory-form-dialog.component.css'
})
export class CreateSubcategoryFormDialogComponent {
  constructor(public dialogRef: MatDialogRef<CreateSubcategoryFormDialogComponent>) { }
  onCancel() : void {
    this.dialogRef.close();
  }
  
  onSubmit() {
    this.dialogRef.close();
  }
}
