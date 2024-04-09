import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { PlacementRowComponent } from '../placement-row/placement-row.component';
import { PaginatorComponent } from '../paginator/paginator.component';

@Component({
  selector: 'app-placement',
  standalone: true,
  imports: [HeaderComponent, MatButtonModule, MatButton, PlacementRowComponent, PaginatorComponent],
  templateUrl: './placement.component.html',
  styleUrl: './placement.component.css'
})
export class PlacementComponent {

}
