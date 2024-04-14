import { NgFor } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Responsible } from '../../models/responsible/responsible';
import { ResponsibleService } from '../../services/responsible/responsible.service';
import { UserService } from '../../services/user/user.service';
import { User } from '../../models/user/user';
import { Role } from '../../models/role/role';

@Component({
  selector: 'app-user-dialog',
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
  templateUrl: './user-dialog.component.html',
  styleUrl: './user-dialog.component.css'
})
export class UserDialogComponent {
  userForm : FormGroup;
  dialogHeader = "Новый пользователь";
  responsibleData : Responsible[] = [];

  constructor (
    @Inject(MAT_DIALOG_DATA) public data : User,
    public dialogRef: MatDialogRef<UserDialogComponent>,
    private responsibleService : ResponsibleService,
    private userService : UserService
  ) {
    this.userForm = new FormGroup({
      id : new FormControl(),
      username : new FormControl(null, [Validators.required, Validators.minLength(8)]),
      password : new FormControl(null, [Validators.required, Validators.minLength(8)]),
      responsible : new FormControl(null, [Validators.required]),
      isAdmin : new FormControl(),
      isLabhead : new FormControl(),
      isUser : new FormControl()
    })
  }

  ngOnInit() {
    console.log(this.data);
    if (!this.data) {
      this.responsibleService.getAll({hasAccount : false}).subscribe({
        next: (data : Responsible[]) => this.responsibleData = data,
        complete: () => { 
          if (this.responsibleData.length == 0) {
            alert('Все существующие работники уже зарегистрированы в системе!');
            this.dialogRef.close();
            return;
          } else {
            this.userForm.patchValue({ responsible : this.responsibleData[0] });
            
          }
        }
      })
    } else {
      this.responsibleData = [this.data.responsible!];
      this.userForm.patchValue({ responsible : this.responsibleData[0] })
      this.loadDataToForm();
    }
    
  }

  onCancel() {
    this.dialogRef.close();
  }

  loadDataToForm() {
    let dataRoles = this.data.roles;
    if (dataRoles?.some((r) => r.name === 'ROLE_ADMIN')) this.userForm.patchValue({ isAdmin : true });
    if (dataRoles?.some((r) => r.name === 'ROLE_LABHEAD')) this.userForm.patchValue({ isLabhead : true });
    if (dataRoles?.some((r) => r.name === 'ROLE_USER')) this.userForm.patchValue({ isUser : true });

    this.userForm.patchValue({
      id : this.data.id,
      username : this.data.username,
      responsible : this.data.responsible,
    })
  }

  onUserDelete() {
    let formValues = this.userForm.value;
    if (!confirm(`Вы уверены, что хотите удалить аккаунт пользователя ` +
    `${formValues.responsible.lastName} ${formValues.responsible.firstName} ${formValues.responsible.patronymic}?`)) return;
    this.userService.delete(formValues.id).subscribe({
      complete: () => {
        alert(`Удаление аккаунта пользователя ` + 
        `${formValues.responsible.lastName} ${formValues.responsible.firstName} ${formValues.responsible.patronymic} прошло успешно!`);
        this.dialogRef.close();
        window.location.reload();
      },
      error: (err) => {
        alert('При удалении аккаунта возникла ошибка');
      }
    })
  }

  onUserCreate() {
    let formValues = this.userForm.value;
    let roles : Role[] = [];

    if (formValues.isAdmin && formValues.isLabhead) {
      alert('Пользователь не может быть одновременно администратором и заведующим лабораторией! Выберите что-то одно!');
      return;
    }
    if (formValues.isAdmin) roles.push(new Role(0, 'ROLE_ADMIN'));
    if (formValues.isUser) roles.push(new Role(0, 'ROLE_USER'));
    if (formValues.isLabhead) roles.push(new Role(0, 'ROLE_LABHEAD'));

    if (roles.length == 0) {
      alert('Выберите хотя бы одну роль для пользователя!');
      return;
    }

    let user : User =  new User(0, formValues.username, formValues.password, formValues.responsible, roles);
    this.userService.create(user).subscribe({
      complete: () => {
        alert('Создание пользователя прошло успешно!');
        this.dialogRef.close();
        window.location.reload();
      }, 
      error: (err) => { alert(err); }
    })
  }
}
