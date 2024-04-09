import { Component } from '@angular/core';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatToolbar, MatToolbarModule } from '@angular/material/toolbar';
import { CreatePlacementFormDialogComponent } from '../create-placement-form-dialog/create-placement-form-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { CreateDepartmentFormDialogComponent } from '../create-department-form-dialog/create-department-form-dialog.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbar, MatToolbarModule, MatIcon, MatButton, MatButtonModule, MatIconModule, CreatePlacementFormDialogComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor (public dialog: MatDialog) {}
  openDialog() {this.dialog.open(CreateDepartmentFormDialogComponent);}
}
