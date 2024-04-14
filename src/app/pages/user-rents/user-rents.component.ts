import { Component } from '@angular/core';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatToolbar, MatToolbarModule } from '@angular/material/toolbar';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { UserRentRowComponent } from '../user-rent-row/user-rent-row.component';
import { Rent } from '../../models/rent/rent';
import { FormsModule } from '@angular/forms';
import { RentService } from '../../services/rent/rent.service';

@Component({
  selector: 'app-user-rents',
  standalone: true,
  imports: [
    FormsModule,
    MatIconModule, 
    MatButtonModule,  
    UserRentRowComponent ],
  templateUrl: './user-rents.component.html',
  styleUrl: './user-rents.component.css'
})
export class UserRentsComponent {
  rents : Rent[] = [];

  constructor (private rentService : RentService) {}

  ngOnInit() {
    this.rentService.getUserRents({isClosed : false}).subscribe({
      next: (data : Rent[]) => this.rents = data,
      complete: () => this.convertRentsStringDatesToISOFormat()
    });
  }

  convertRentsStringDatesToISOFormat() {
    for (let rent of this.rents) {
      rent.createDateTime = rent.createDateTime.substring(0, 19);
      rent.endDateTime = rent.endDateTime ? rent.endDateTime.substring(0, 19) : undefined;
    } 
  }
}
