import { ApplicationConfig } from '@angular/core';
import { Routes, provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { MainComponent } from './pages/main/main.component';
import { LoginComponent } from './pages/login/login.component';
import { UserSearchComponent } from './pages/user-search/user-search.component';
import { CreateRentComponent } from './pages/create-rent/create-rent.component';
import { EquipmentComponent } from './pages/equipment/equipment.component';
import { RentComponent } from './pages/rent/rent.component';
import { CategoryComponent } from './pages/category/category.component';
import { SubcategoryComponent } from './pages/subcategory/subcategory.component';
import { PlacementComponent } from './pages/placement/placement.component';
import { ResponsibleComponent } from './pages/responsible/responsible.component';
import { httpInterceptor } from './helpers/http.interceptor';
import { UserRentsComponent } from './pages/user-rents/user-rents.component';
import { DepartmentComponent } from './pages/department/department.component';
import { UsersComponent } from './pages/users/users.component';

const appRoutes: Routes = [
  { path: "main", component: MainComponent },
  { path: "login", component: LoginComponent },
  { path: "users", component: UsersComponent },
  { path: "user-search", component: UserSearchComponent },
  { path: "user-rents", component: UserRentsComponent },
  { path: "new-rent", component: CreateRentComponent },
  { path: "equipment", component: EquipmentComponent },
  { path: "responsible", component: ResponsibleComponent },
  { path: 'departments', component: DepartmentComponent },
  { path: "rents", component: RentComponent },
  { path: "categories", component: CategoryComponent },
  { path: "subcategories", component: SubcategoryComponent },
  { path: "placements", component: PlacementComponent },
  { path: '', redirectTo: "login", pathMatch:"full" }
]

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptors([httpInterceptor])), 
    provideRouter(appRoutes), 
    provideAnimationsAsync()
  ]
};
