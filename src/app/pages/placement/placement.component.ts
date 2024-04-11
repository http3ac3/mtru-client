import { Component, ViewChild } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { PlacementRowComponent } from '../placement-row/placement-row.component';
import { MyCustomPaginatorIntl, PaginatorComponent } from '../paginator/paginator.component';
import { Placement } from '../../models/placement/placement';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatPaginatorModule } from '@angular/material/paginator';
@Component({
  selector: 'app-placement',
  standalone: true,
  imports: [HeaderComponent, MatButtonModule, MatButton, MatPaginatorModule, MatTableModule],
  templateUrl: './placement.component.html',
  styleUrl: './placement.component.css'
})
export class PlacementComponent {
  placements : Placement[] = [new Placement(1, 'Помещение 1'), new Placement(2, 'Помзеение 2')];
  dataSource = new MatTableDataSource<Placement>(this.placements);
  displayedColumns : string[] = ['id', 'name'];

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  ngOnInit() {
    // this.categoryService.getCategories().subscribe({next:(data: any[]) => this.categories = data});
  }

  ngAfterViewInit() {
    this.paginator._intl = new MyCustomPaginatorIntl;
    this.dataSource.paginator = this.paginator;
  }
}
