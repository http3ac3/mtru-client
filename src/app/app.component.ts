import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
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

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, 
    MainComponent, 
    EquipmentComponent,
    ResponsibleComponent, 
    PlacementComponent,
    CategoryComponent,
    SubcategoryComponent, 
    RentComponent,
    CreateRentComponent,
    UserSearchComponent,
    UserRentsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'mtru-client';
}
