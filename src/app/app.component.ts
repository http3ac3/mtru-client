import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { MainComponent } from './pages/main/main.component';
import { EquipmentComponent } from './pages/equipment/equipment.component';
import { ResponsibleComponent } from './pages/responsible/responsible.component';
import { PlacementComponent } from './pages/placement/placement.component';
import { CategoryComponent } from './pages/category/category.component';
import { SubcategoryComponent } from './pages/subcategory/subcategory.component';
import { RentComponent } from './pages/rent/rent.component';
import { CreateRentComponent } from './pages/create-rent/create-rent.component';
import { UserSearchComponent } from './pages/user-search/user-search.component';
import { UserRentsComponent } from './pages/user-rents/user-rents.component';
import { AuthService } from './services/Auth/auth.service';
import { Category } from './models/category/category';
import { DepartmentComponent } from './pages/department/department.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { StorageService } from './services/storage/storage.service';
import { Role } from './models/role/role';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { CreateModelsDialogComponent } from './pages/dialogs/create-models-dialog/create-models-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ImportComponent } from './pages/dialogs/import-dialog/import/import.component';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, 
    LoginComponent,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    CreateModelsDialogComponent, 
    RouterLink,
    MatTooltipModule,
    NgStyle
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  user : any = null;
  responsible : any = null;

  title = 'mtru-client';
  isLoggedIn = false;
  isLoginFailed = false;
  isAdmin = false;
  isLabhead = false;
  isUser = false;
  roles: Role[] = [];

  constructor(
    private authService: AuthService, 
    private storageService: StorageService,
    private router: Router, public dialog: MatDialog) {}

  ngOnInit() {
    this.isLoggedIn = this.storageService.isLoggedIn();

    if (this.isLoggedIn) {
      this.user = this.storageService.getUser();
      this.responsible = this.storageService.getResponsible();
      this.roles = this.user.roles;
      this.isAdmin = this.roles.some(role => role.name === "ROLE_ADMIN");
      this.isLabhead = this.roles.some(role => role.name === "ROLE_LABHEAD");
      this.isUser = this.roles.some(role => role.name === "ROLE_USER");
    }
  }

  logout() {
    this.authService.logout();
    this.isLoggedIn = false;
    this.router.navigate(['login']);
  }

  onOpenAddInfoDialog() {
    if (this.isLabhead) {
      this.dialog.open(CreateModelsDialogComponent, {
        data: {
          isAdmin : false
        }
      })
    }
    else {
      this.dialog.open(CreateModelsDialogComponent, {
        data: {
          isAdmin: true
        }
      })
    }
  }

  onOpenImportDialog() {
    this.dialog.open(ImportComponent, {
      autoFocus: false
    });
  }
}
