import { Component, Injectable } from '@angular/core';
import {MatPaginatorIntl, MatPaginatorModule} from '@angular/material/paginator';
import {Subject} from 'rxjs';
// import { $localize } from '@angular/localize';

@Injectable()
export class MyCustomPaginatorIntl implements MatPaginatorIntl {
  changes = new Subject<void>();

  // For internationalization, the `$localize` function from
  // the `@angular/localize` package can be used.
  firstPageLabel = `Первая страница`;
  itemsPerPageLabel = `Количество строк`;
  lastPageLabel = `Последняя страница`;

  // You can set labels to an arbitrary string too, or dynamically compute
  // it through other third-party internationalization libraries.
  nextPageLabel = 'Следующая страница';
  previousPageLabel = 'Предыдущая страница';

  getRangeLabel(page: number, pageSize: number, length: number): string {
    if (length === 0) {
      return `Страница 1 из 1`;
    }
    const amountPages = Math.ceil(length / pageSize);
    return `Страница ${page + 1} из ${amountPages}`;
  }
}

@Component({
  selector: 'app-paginator',
  standalone: true,
  imports: [MatPaginatorModule],
  providers: [{provide: MatPaginatorIntl, useClass: MyCustomPaginatorIntl}],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.css'
})
export class PaginatorComponent {

}
