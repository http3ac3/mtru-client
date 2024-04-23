import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subcategory } from '../../models/subcategory/subcategory';
import { Category } from '../../models/category/category';

const API_URL = 'http://localhost:8080/api/v1'

@Injectable({
  providedIn: 'root'
})
export class SubcategoryService {

  constructor(private http : HttpClient) { }

  /**
   * Получение списка записей подкатегорий
   * 
   * @returns список подкатегорий
   */
  getAll() : Observable<Subcategory[]> {
    return this.http.get<Subcategory[]>(API_URL + '/subcategories');
  }

  /**
   * Получение списка записей подкатегорий по категории
   * 
   * @param category категория
   * @returns список записей
   */
  getByCategory(category : Category) : Observable<Subcategory[]> {
    return this.http.get<Subcategory[]>(API_URL + `/categories/${category.id}/subcategories`);
  }

  /**
   * Создание новой подкатегории
   * 
   * @param subcategory новая подкатегория
   * @returns http-ответ
   */
  create(subcategory : Subcategory) : Observable<string> {
    return this.http.post(API_URL + `/categories/${subcategory.category.id}/subcategories`, subcategory, {
      responseType : 'text'
    });
  }


  /**
   * Обновление информации о существующей подкатегории по ID
   * 
   * @param subcategory обновленная информация о категории
   * @returns http-ответ
   */
  update(subcategory : Subcategory) : Observable<string> {
    return this.http.put(API_URL + `/subcategories/${subcategory.id}`, subcategory, {
      params: {
        categoryId : subcategory.category.id
      },
      responseType : 'text'
    });
  }

  /**
   * Удаление подкатегории по ID
   *  
   * @param id идентификатор подкатегории
   * @returns http-ответы
   */
  delete(id : number) : Observable<string> {
    return this.http.delete(API_URL + `/subcategories/${id}`, {
      responseType : 'text'
    });
  }
}
