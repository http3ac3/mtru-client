import { Component } from '@angular/core';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatToolbar, MatToolbarModule } from '@angular/material/toolbar';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { UserRentRowComponent } from '../user-rent-row/user-rent-row.component';
import { Rent } from '../../models/rent/rent';
import { FormsModule } from '@angular/forms';
import { RentService } from '../../services/rent/rent.service';
import { StorageService } from '../../services/storage/storage.service';
import { Router } from '@angular/router';

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

  constructor (
    private rentService : RentService,
    private storageService : StorageService,
    private router : Router
  ) {}

  ngOnInit() {
    if (this.storageService.getUser() == null) {
      alert('Вы не авторизованы!');
      this.router.navigate(['login']);
      return;
    }
    
    let currentUserRoles = this.storageService.getUser().roles;
    
    if (!currentUserRoles.some((r : any) => r.name === 'ROLE_USER')) {
      alert('Вы не имеете роли обычного пользователя для доступа к данной странице!');
      this.router.navigate(['login']);
    }

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
