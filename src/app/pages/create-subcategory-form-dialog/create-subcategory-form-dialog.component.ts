import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { MatFormField } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Subcategory } from '../../models/subcategory/subcategory';
import { CategoryService } from '../../services/category/category.service';
import { SubcategoryService } from '../../services/subcategory/subcategory.service';
import { Category } from '../../models/category/category';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-create-subcategory-form-dialog',
  standalone: true,
  imports: [
    FormsModule,
    MatDialogTitle, 
    MatDialogContent, 
    MatDialogActions, 
    MatFormField,  
    MatDialogClose,
    MatInputModule,
    MatButtonModule, 
    MatSelectModule, 
    MatIconModule,
    NgFor
  ],
  templateUrl: './create-subcategory-form-dialog.component.html',
  styleUrl: './create-subcategory-form-dialog.component.css'
})
export class CreateSubcategoryFormDialogComponent {
  subcategory = {
    id : 0,
    name : "",
    category : new Category(0, "")
  }
  categories : Category[] = [];
  dialogHeader = "Новая подкатегория";
  selectedCategory : any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data : Subcategory,
    public dialogRef: MatDialogRef<CreateSubcategoryFormDialogComponent>,
    private categoryService : CategoryService,
    private subcategoryService : SubcategoryService
  ) {}

  ngOnInit() {
    this.categoryService.getAll().subscribe({
      next: (data : Category[]) => {this.categories = data},
      complete: () => {
        if (this.data) this.selectedCategory = this.categories.find(c => c.name === this.data.category.name);
        else this.selectedCategory = this.categories[0];
      }
    });  
    if (this.data) {
      this.dialogHeader = "Подробные сведения";
      this.subcategory = this.data;
    }
  }
  
  onCancel() : void {
    this.dialogRef.close();
  }
  
  onSubcategoryCreate() {
    this.subcategory.name = this.subcategory.name.trim();
    this.subcategory.category = this.selectedCategory;

    this.subcategoryService.create(this.subcategory).subscribe({
      complete: () => {
        alert(`Подкатегория "${this.subcategory.name}" была успешно сохранена!`)
        this.dialogRef.close();
        window.location.reload();
      },
      error: (err) => {
        console.log(err.status === 400);
        alert(`Подкатегория "${this.subcategory.name}" уже существует`);
      }
    });
  }

  onSubcategoryChange() {
    this.subcategory.name = this.subcategory.name.trim();
    this.subcategory.category = this.selectedCategory;

    this.subcategoryService.update(this.subcategory).subscribe({
      complete: () => {
        alert('Данные были успешно обновлены!');
        this.dialogRef.close();
        window.location.reload();
      },
      error: (err) => {
        alert(`Подкатегория "${this.subcategory.name}" уже существует`);
      }
    });
  }

  onSubcategoryDelete() {
    this.subcategoryService.delete(this.subcategory.id).subscribe({
      complete: () => {
        alert(`Данные о "${this.subcategory.name}" были успешно удалены!`);
        this.dialogRef.close();
        window.location.reload();
      },
      error: (err) => {
        if (err.status === 404) {
          alert('Данной подкатегории не существует!');
        } else if (err.status === 409) {
          alert(`Подкатегория "${this.subcategory.name}" не может быть удалена: ` +  
                `за ней закреплено оборудование университета!`);
        } else {
          alert('Непредвиденная ошибка! Удалить структурное подразделение невозможно');
        }
      }
    });
  }
}
