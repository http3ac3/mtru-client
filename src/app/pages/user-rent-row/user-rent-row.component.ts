import { Component, Input } from '@angular/core';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatFormField, MatInput, MatInputModule } from '@angular/material/input';
import { Rent } from '../../models/rent/rent';
import { RentService } from '../../services/rent/rent.service';

@Component({
  selector: 'app-user-rent-row',
  standalone: true,
  imports: [MatButton, MatButtonModule, MatInput, MatInputModule, MatFormField, MatFormFieldModule],
  templateUrl: './user-rent-row.component.html',
  styleUrl: './user-rent-row.component.css'
})
export class UserRentRowComponent {
  @Input() rent : any;

  constructor(private rentService : RentService) {}

  closeRent() {
    this.rentService.update(this.rent.id).subscribe({
      complete: () => {
        alert(`Взятие оборудования ${this.rent.equipment.name} (инв. № ${this.rent.equipment.inventoryNumber}) ` + 
        ' успешно завершено!')
      }
    });
    window.location.reload();
  }
}
