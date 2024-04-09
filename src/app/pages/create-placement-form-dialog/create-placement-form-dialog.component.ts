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
  selector: 'app-create-placement-form-dialog',
  standalone: true,
  imports: [ FormsModule,
    MatDialogTitle, 
    MatDialogContent, 
    MatDialogActions, 
    MatFormField, 
    MatLabel, 
    MatDialogClose,
    MatInput,
    MatButton],
  templateUrl: './create-placement-form-dialog.component.html',
  styleUrl: './create-placement-form-dialog.component.css'
})
export class CreatePlacementFormDialogComponent {
  name : string | undefined;

  constructor(public dialogRef: MatDialogRef<CreatePlacementFormDialogComponent>) { }
  onCancel() : void {
    this.dialogRef.close();
  }
  
  onSubmit() {
    console.log("created " + this.name);
    this.dialogRef.close();
  }
}
