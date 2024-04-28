import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MyCustomPaginatorIntl, PaginatorComponent } from '../paginator/paginator.component';
import { Placement } from '../../models/placement/placement';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { PlacementService } from '../../services/placement/placement.service';
import { MatDialog } from '@angular/material/dialog';
import { CreatePlacementFormDialogComponent } from '../dialogs/create-placement-form-dialog/create-placement-form-dialog.component';
import { MatIconModule } from '@angular/material/icon';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { Router } from '@angular/router';
import { AccessService } from '../../services/access/access.service';
@Component({
  selector: 'app-placement',
  standalone: true,
  imports: [
    MatButtonModule,
    PaginatorComponent,  
    MatTableModule, 
    MatPaginator, 
    MatPaginatorModule, 
    MatIconModule,
    MatFormFieldModule, 
    MatInputModule,
    MatSortModule
  ],
  templateUrl: './placement.component.html',
  styleUrl: './placement.component.css'
})
export class PlacementComponent {
  placements : Placement[] = [];
  dataSource = new MatTableDataSource<Placement>(this.placements);
  displayedColumns : string[] = ['id', 'name'];

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor (
    private placementService : PlacementService, 
    private dialog : MatDialog,
    private router : Router,
    private accessService : AccessService
  ) { }

  ngOnInit() {
    if (!this.accessService.isAuthorized()) {
      alert('Вы не авторизованы!');
      this.router.navigate(['login']);
      return;
    }

    if (!this.accessService.isAdmin() && !this.accessService.isLabhead()) {
        alert('Вы не имеете роли администратора или заведующего лабораторией для доступа к данной странице!');
        this.router.navigate(['login']);
        return;
    }

    this.paginator._intl = new MyCustomPaginatorIntl;
    this.placementService.getAll().subscribe({
      next: (data : Placement[]) => {
        this.placements = data;
      },
      complete: () => {
        this.dataSource.data = this.placements;
      }
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  searchByName(event : Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  clickRow(row : Placement) {
    let placement = {
      id : row.id,
      name : row.name
    }
    this.dialog.open(CreatePlacementFormDialogComponent, {
      data : placement,
      autoFocus : false
    })
  }
}
