import { Component } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormField, MatFormFieldModule, MatLabel} from '@angular/material/form-field';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/Auth/auth.service';
import { UserService } from '../../services/user/user.service';
import { StorageService } from '../../services/storage/storage.service';
import { Role } from '../../models/role/role';
import { User } from '../../models/user/user';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatFormField, 
    MatLabel, 
    FormsModule, 
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    CommonModule,
    ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  form: any = {
    username: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  isAdmin = false;
  isLabhead = false;
  isUser = false;
  errorMessage = '';
  roles: Role[] = [];

  user : any = null;

  constructor(
    public authService: AuthService, 
    public userService : UserService,
    public storageService : StorageService, 
    private router: Router) {}

  ngOnInit() {
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.roles = this.storageService.getUser().roles;
    }

    this.isAdmin = this.roles.some(role => role.name === "ROLE_ADMIN");
    this.isLabhead = this.roles.some(role => role.name === "ROLE_LABHEAD");
    this.isUser = this.roles.some(role => role.name === "ROLE_USER");
  }

  onLogin() : void {
    const { username, password } = this.form;

    this.authService.login(username, password).subscribe({
      next: data => {
        this.storageService.saveToken(data.token);

        this.userService.getCurrentUser().subscribe({
          next: data => {
            this.user = new User(data.id, data.username, data.password, data.responsible, data.roles);
            this.storageService.saveUser(this.user);
          }
        });

        this.isLoginFailed = false;
        this.isLoggedIn = true;
      }, error: err => {
        alert('Неправильный логин или пароль, попробуйте еще раз');
        console.log(err);
        this.isLoginFailed = false;
      }
    }) 
  }
}
