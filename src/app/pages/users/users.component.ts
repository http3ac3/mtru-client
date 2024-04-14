import { Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MyCustomPaginatorIntl } from '../paginator/paginator.component';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { User } from '../../models/user/user';
import { UserService } from '../../services/user/user.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { UserDialogComponent } from '../user-dialog/user-dialog.component';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    MatPaginator,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
  users : User[] = []
  dataSource = new MatTableDataSource<User>(this.users);
  displayedColumns : string[] = ['id', 'username', 'responsible'];

  constructor(private userService : UserService, public dialog : MatDialog) {}

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit() {
    this.paginator._intl = new MyCustomPaginatorIntl;

    this.userService.getAll().subscribe({
      next: (data : User[]) => {
        this.users = data; 
      },
      complete: () => this.dataSource.data = this.users
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;    
    this.dataSource.sort = this.sort;
  }

  clickRow(row : User) {
    let user = {
      id : row.id,
      username : row.username,
      responsible : row.responsible,
      roles : row.roles     
    }
    this.dialog.open(UserDialogComponent, {
      data : user,
      autoFocus : false
    })
  }
}
