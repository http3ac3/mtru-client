import { Component, Input } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { CategoryServiceService } from '../../services/category-service.service';
import { Router } from '@angular/router';
import { SubcategoryServiceService } from '../../services/Subcategory/subcategory-service.service';

@Component({
  selector: 'app-category-row',
  standalone: true,
  imports: [MatButton],
  templateUrl: './category-row.component.html',
  styleUrl: './category-row.component.css'
})
export class CategoryRowComponent {
  @Input() categoryId : number = -1;
  @Input() categoryName : string = "";

  constructor(
    public categoryService : CategoryServiceService,
    public subcategoryService : SubcategoryServiceService,
    public router : Router) { }

  onDelete() {
    this.categoryService.deleteCategory(this.categoryId).subscribe();
    this.router.navigate(['categories']);
  }

  onSubcategoriesShow() {
    this.subcategoryService.getSubcategoriesByCategoryId(this.categoryId).subscribe();
  }
}
