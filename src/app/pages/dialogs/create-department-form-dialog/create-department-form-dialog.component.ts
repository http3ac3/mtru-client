import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialog,
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
import { Department } from '../../../models/department/department';
import { DepartmentService } from '../../../services/department/department.service';

@Component({
  selector: 'app-create-department-form-dialog',
  standalone: true,
  imports: [FormsModule,
    MatDialogTitle, 
    MatDialogContent, 
    MatDialogActions, 
    MatDialogClose,
    MatFormField, 
    MatInputModule,
    MatButtonModule,
    MatIconModule 
  ],
  templateUrl: './create-department-form-dialog.component.html',
  styleUrl: './create-department-form-dialog.component.css'
})
export class CreateDepartmentFormDialogComponent {
  dialogHeader = "Новое структурное подразделение"
  department : Department = { id : 0, name : "" }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data : Department,
    public dialogRef: MatDialogRef<CreateDepartmentFormDialogComponent>,
    private departmentService : DepartmentService
  ) { }

  ngOnInit() {
    if (this.data) {
      this.department = this.data
      this.dialogHeader = "Подробные сведения"
    }
  }

  onCancel() : void {
    this.dialogRef.close();
  }
  
  onDepartmentCreate() {
    this.department.name = this.department.name.trim();

    if (this.department.name === '') {
      alert('Поле не должно быть пустым!');
      return;
    }

    this.departmentService.create(this.department).subscribe({
      complete: () => {
        alert(`Структурное подразделение "${this.department.name}" было успешно сохранено!`)
        this.dialogRef.close();
        window.location.reload();
      },
      error: (err) => {
        console.log(err.status === 400);
        alert(`Структурное подразделение "${this.department.name}" уже существует`);
      }
    });
  }
  onDepartmentChange() {
    this.department.name = this.department.name.trim();
    if (!confirm(`Вы уверены, что хотите изменить выбранное структурное подразделение?`)) return;
    if (this.department.name === '') {
      alert('Поле не должно быть пустым!');
      return;
    }

    this.departmentService.update(this.department).subscribe({
      complete: () => {
        alert('Данные были успешно обновлены!');
        this.dialogRef.close();
        window.location.reload();
      },
      error: (err) => {
        alert(`Структурное подраздление "${this.department.name}" уже существует`);
      }
    });
  }

  onDepartmentDelete() {
    if (!confirm(`Вы уверены, что хотите удалить выбранное структурное подразделение?`)) return;
    this.departmentService.delete(this.department.id).subscribe({
      complete: () => {
        alert(`Данные о "${this.department.name}" были успешно удалены!`);
        this.dialogRef.close();
        window.location.reload();
      },
      error: (err) => {
        if (err.status === 404) {
          alert('Данного структурного подразделения не существует!');
        } else if (err.status === 409) {
          alert(`Структурное подразделение "${this.department.name}" не может быть удалено: ` +  
                `за ним закреплены другие работники университета!`);
        } else {
          alert('Непредвиденная ошибка! Удалить структурное подразделение невозможно');
        }
      }
    });
  } 

  
  
}
