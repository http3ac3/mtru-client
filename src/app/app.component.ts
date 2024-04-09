import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { MainComponent } from './pages/main/main.component';
import { EquipmentComponent } from './pages/equipment/equipment.component';
import { ResponsibleComponent } from './pages/responsible/responsible.component';
import { PlacementComponent } from './pages/placement/placement.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MainComponent, EquipmentComponent, ResponsibleComponent, PlacementComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'mtru-client';
}
