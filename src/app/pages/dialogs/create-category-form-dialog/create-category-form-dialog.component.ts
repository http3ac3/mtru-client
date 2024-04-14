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
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { Router } from '@angular/router';
import { Category } from '../../../models/category/category';
import { MatIconModule } from '@angular/material/icon';
import { CategoryService } from '../../../services/category/category.service';

@Component({
  selector: 'app-create-category-form-dialog',
  standalone: true,
  imports: [FormsModule,
    MatDialogTitle, 
    MatDialogContent, 
    MatDialogActions, 
    MatFormField, 
    MatLabel, 
    MatDialogClose,
    MatInput,
    MatButtonModule,
    MatIconModule],
  templateUrl: './create-category-form-dialog.component.html',
  styleUrl: './create-category-form-dialog.component.css'
})
export class CreateCategoryFormDialogComponent {
  category : Category = { id: 0, name : "" }
  dialogHeader = "Новая категория";

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Category,
    public dialogRef: MatDialogRef<CreateCategoryFormDialogComponent>, 
    public categoryService : CategoryService,
    public router : Router
  ) { }

  ngOnInit() {
    if (this.data) {
      this.dialogHeader = "Подробные сведения"
      this.category = this.data;
    }
  }
  
  onCancel() : void {
    this.dialogRef.close();
  }

  onCategoryCreate() {
    this.category.name = this.category.name.trim();

    if (this.category.name === '') {
      alert('Поле не должно быть пустым!');
      return;
    }

    this.categoryService.create(this.category).subscribe({
      complete: () => {
        alert(`Категория ${this.category.name} была успешно сохранена!`)
        this.dialogRef.close();
        window.location.reload();
      },
      error: (err) => {
        console.log(err.status === 400);
        alert('Такая категория уже существует');
      }
    });
  }
  
  onCategoryChange() {
    this.category.name = this.category.name.trim();

    if (this.category.name === '') {
      alert('Поле не должно быть пустым!');
      return;
    }

    this.categoryService.update(this.category).subscribe({
      complete: () => {
        alert('Данные были успешно обновлены!');
        this.dialogRef.close();
        window.location.reload();
      },
      error: (err) => {
        alert('Такая категория уже существует');
      }
    });
  }

  onCategoryDelete() {
    this.categoryService.delete(this.category.id!).subscribe({
      complete: () => {
        alert('Данные были успешно удалены!');
        this.dialogRef.close();
        window.location.reload();
      },
      error: (err) => {
        if (err.status === 404) {
          alert('Данной категории не существует!');
        } else if (err.status === 409) {
          alert('Категория не может быть удалена: за ней закреплены другие подкатегории!');
        } else {
          alert('Непредвиденная ошибка! Удалить категорию невозможно');
        }
      }
    });
  }  
}
