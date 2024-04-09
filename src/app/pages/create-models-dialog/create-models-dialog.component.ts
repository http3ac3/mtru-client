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
  constructor(public dialogRef: MatDialogRef<CreateModelsDialogComponent>) { }
  onCancel() : void {
    this.dialogRef.close();
  }
}
