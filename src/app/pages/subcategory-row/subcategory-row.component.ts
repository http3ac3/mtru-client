import { Component, Input } from '@angular/core';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-subcategory-row',
  standalone: true,
  imports: [MatButton],
  templateUrl: './subcategory-row.component.html',
  styleUrl: './subcategory-row.component.css'
})
export class SubcategoryRowComponent {
  @Input() subcategoryId : number = -1;
  @Input() subcategoryName : string = "";
}
