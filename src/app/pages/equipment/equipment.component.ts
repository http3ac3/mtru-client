import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatExpansionModule} from '@angular/material/expansion';
import { EquipmentRowComponent } from '../equipment-row/equipment-row.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import { PaginatorComponent } from '../paginator/paginator.component';

@Component({
  selector: 'app-equipment',
  standalone: true,
  imports: [MatToolbarModule, MatPaginatorModule,
     MatIconModule, MatButtonModule, FormsModule, MatInputModule, MatFormFieldModule, MatExpansionModule, EquipmentRowComponent, PaginatorComponent],
  templateUrl: './equipment.component.html',
  styleUrl: './equipment.component.css'
})
export class EquipmentComponent {
  panelOpenState = false;
}
