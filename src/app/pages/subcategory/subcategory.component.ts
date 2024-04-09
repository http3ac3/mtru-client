import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { MatExpansionModule, MatExpansionPanel} from '@angular/material/expansion';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatButton } from '@angular/material/button';
import { SubcategoryRowComponent } from '../subcategory-row/subcategory-row.component';
import { PaginatorComponent } from '../paginator/paginator.component';

@Component({
  selector: 'app-subcategory',
  standalone: true,
  imports: [HeaderComponent, MatExpansionModule, MatCheckbox, MatButton, SubcategoryRowComponent, PaginatorComponent],
  templateUrl: './subcategory.component.html',
  styleUrl: './subcategory.component.css'
})
export class SubcategoryComponent {

}
