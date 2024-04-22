import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../../models/category/category';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:8080/api/v1'

@Injectable({
  providedIn: 'root'
})

export class CategoryService {
  
  constructor(private http: HttpClient) {  }

  /**
   * Получение всех записей категорий из базы данных
   * 
   * @returns список категорий
   */
  getAll() : Observable<any>{
    return this.http.get<any>(API_URL + '/categories');
  }

  /**
   * Сохранение категории в базу данных
   * 
   * @param category сохраняемая категория
   * @returns http-ответ
   */
  create(category: any) : Observable<any> {
    return this.http.post<any>(API_URL + '/categories', category);
  }


  /**
   * Обновление существующей категории по ID
   * 
   * @param category - новая информация о категории
   * @returns http-ответ
   */
  update(category : any) : Observable<string> {
    return this.http.put(API_URL + '/categories', category, {
      responseType: 'text'
    });
  }


  /**
   * Удаление существующей категории по ID
   * 
   * @param id идентификатор удаляемой категории
   * @returns http-ответ
   */
  delete(id : number): Observable<any> {
    return this.http.delete<any>(API_URL + '/categories/' + id);
  }
}
