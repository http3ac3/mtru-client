import { Component, Inject } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Responsible } from '../../../models/responsible/responsible';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DepartmentService } from '../../../services/department/department.service';
import { ResponsibleService } from '../../../services/responsible/responsible.service';
import { MatIconModule } from '@angular/material/icon';
import { Department } from '../../../models/department/department';
import { NgFor } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { AccessService } from '../../../services/access/access.service';

@Component({
  selector: 'app-create-responsible-form-dialog',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    MatDialogTitle, 
    MatDialogContent, 
    MatDialogActions, 
    MatFormFieldModule, 
    MatDialogClose,
    MatSelectModule,
    MatCheckboxModule, 
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    NgFor
  ],
  templateUrl: './create-responsible-form-dialog.component.html',
  styleUrl: './create-responsible-form-dialog.component.css'
})
export class CreateResponsibleFormDialogComponent { 
  responsibleForm : FormGroup;
  dialogHeader = "Новый ответственный";
  departments : Department[] = []
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public data : Responsible,
    public dialogRef: MatDialogRef<CreateResponsibleFormDialogComponent>, 
    private departmentService : DepartmentService,
    private responsibleService : ResponsibleService,
    public accessService : AccessService
  ) {
    this.responsibleForm = new FormGroup({
      id : new FormControl(),
      lastName : new FormControl(null, [Validators.required]),
      firstName : new FormControl(null, [Validators.required]),
      patronymic : new FormControl(),
      position : new FormControl(null, [Validators.required]),
      phoneNumber : new FormControl(null, [Validators.required, Validators.pattern("79[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]")]),
      financiallyResponsible : new FormControl(),
      department : new FormControl(null, [Validators.required])
    });
   }

  ngOnInit() {
    this.departmentService.getAll().subscribe({
        next: (data : Department[]) => {
        this.departments = data;
      },
      complete: () => {
        if (this.data) {
          this.dialogHeader = 'Подробные сведения';
          this.loadData(this.data);  
        }
        else {
          this.responsibleForm.patchValue({ department : this.departments[0] })
        }
      }
    });
  }
  onCancel() : void {
    this.dialogRef.close();
  }
  
  onResponsibleCreate() {
    let formValues = this.responsibleForm.value;
    let responsible = this.createResponsibleFromForm(formValues);
    this.responsibleService.create(responsible).subscribe({
      complete: () => {
        alert(`Информация о "${responsible.lastName} ${responsible.firstName} ${responsible.patronymic}"
              была успешно сохранена`);
        this.dialogRef.close();
        window.location.reload();
      },
      error: (err) => {
        alert('При сохранении информации произошла ошибка! Проверьте правильность заполнения формы');
      }
    })
  }

  onResponsibleChange() {
    let formValues = this.responsibleForm.value;
    let responsible = this.createResponsibleFromForm(formValues);
    if (!confirm(`Вы уверены что хотите изменить данные о ` +
        `${responsible.lastName} ${responsible.firstName} ${responsible.patronymic}?`)) return;
    this.responsibleService.update(responsible).subscribe({
      complete: () => {
        alert('Данные были успешно обновлены!');
        this.dialogRef.close();
        window.location.reload();
      },
      error: (err) => {
        alert(`Ответственный с номером телефона "${responsible.phoneNumber}" уже существует`);
      }
    });
  }

  onResponsibleDelete() {
    let formValues = this.responsibleForm.value;
    let responsible = this.createResponsibleFromForm(formValues);
    if (!confirm(`Вы уверены что хотите удалить данные о ` +
        `${responsible.lastName} ${responsible.firstName} ${responsible.patronymic}?`)) return;
        this.responsibleService.delete(responsible.id).subscribe({
          complete: () => {
            alert(`Данные о данные о ` +
              `${responsible.lastName} ${responsible.firstName} ${responsible.patronymic} были успешно удалены!`);
            this.dialogRef.close();
            window.location.reload();
          },
          error: (err) => {
            if (err.status === 404) {
              alert('Данного ответственного не существует!');
            } else if (err.status === 409) {
              alert(`Ответственный ${responsible.lastName} ${responsible.firstName} ${responsible.patronymic} не может быть удален: ` +  
                    `за ним закреплены оборудование университета и/или взятия!`);
            } else {
              alert('Непредвиденная ошибка! Удалить ответственного невозможно');
            }
          }
        });
  }

  loadData(data : any) {
    this.responsibleForm.patchValue({
      id : data.id,
      lastName : data.lastName,
      firstName : data.firstName,
      patronymic : data.patronymic,
      position : data.position,
      phoneNumber : data.phoneNumber,
      financiallyResponsible : data.financiallyResponsible,
      department : this.departments.find(d => d.name === data.department.name)
    });
  }

  createResponsibleFromForm(formValues : any) : Responsible {
    return new Responsible(
      formValues.id, formValues.lastName.trim(), formValues.firstName.trim(), formValues.patronymic.trim(), formValues.position.trim(),
      formValues.phoneNumber, formValues.financiallyResponsible, formValues.department);
  }
}
