import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatExpansionModule, MatExpansionPanel} from '@angular/material/expansion';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatButton } from '@angular/material/button';
import { Subcategory } from '../../models/subcategory/subcategory';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-subcategory',
  standalone: true,
  imports: [MatExpansionModule, MatCheckbox, MatButton, MatPaginator, MatPaginatorModule, MatTableModule],
  templateUrl: './subcategory.component.html',
  styleUrl: './subcategory.component.css'
})
export class SubcategoryComponent implements AfterViewInit{
  subcategories : Subcategory[] = [];
  dataSource = new MatTableDataSource<Subcategory>(this.subcategories);
  displayedColumns : string[] = ['id', 'name', 'category'];

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor () {}

  ngOnInit() {
    // this.subcategoryService.getSubcategories().subscribe({next:(data: any[]) => this.subcategories = data});
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;    
  }

}
