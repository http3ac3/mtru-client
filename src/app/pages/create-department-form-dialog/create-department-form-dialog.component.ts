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

@Component({
  selector: 'app-create-department-form-dialog',
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
  templateUrl: './create-department-form-dialog.component.html',
  styleUrl: './create-department-form-dialog.component.css'
})
export class CreateDepartmentFormDialogComponent {
  constructor(public dialogRef: MatDialogRef<CreateDepartmentFormDialogComponent>) { }
  onCancel() : void {
    this.dialogRef.close();
  }
  
  onSubmit() {
    this.dialogRef.close();
  }
}
