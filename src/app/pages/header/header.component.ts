import { Component } from '@angular/core';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatToolbar, MatToolbarModule } from '@angular/material/toolbar';
import { MatDialog } from '@angular/material/dialog';
import { CreateModelsDialogComponent } from '../create-models-dialog/create-models-dialog.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbar, MatToolbarModule, MatIcon, MatButton, MatButtonModule, MatIconModule, CreateModelsDialogComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor (public dialog: MatDialog) {}
  openDialog() {this.dialog.open(CreateModelsDialogComponent);}
}
