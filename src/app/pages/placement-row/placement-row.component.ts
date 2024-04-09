import { Component } from '@angular/core';
import { MatButton, MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-placement-row',
  standalone: true,
  imports: [MatButton, MatButtonModule],
  templateUrl: './placement-row.component.html',
  styleUrl: './placement-row.component.css'
})
export class PlacementRowComponent {

}
