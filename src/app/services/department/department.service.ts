import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Department } from '../../models/department/department';

const DEPARTMENTS_API_URL = 'http://localhost:8080/api/v1/departments'

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(private http : HttpClient) { }

  /**
   * Получение списка записей структурных подразделений
   * 
   * @returns список структурных подразделений
   */
  getAll() : Observable<Department[]> {
    return this.http.get<Department[]>(DEPARTMENTS_API_URL);
  }

  /**
   * Создание нового структурного подразделения
   * 
   * @param department новое структурное подразделение
   * @returns http-ответ
   */
  create(department : Department) : Observable<string> {
    return this.http.post(DEPARTMENTS_API_URL, department, {
      responseType : 'text'
    });
  } 

  /**
   * Обновление существующего структурного подразделения по ID
   * 
   * @param department новая информация о структурном подразделении
   * @returns http-ответ
   */
  update(department : Department) : Observable<string> {
    return this.http.put(DEPARTMENTS_API_URL + `/${department.id}`, department, {
      responseType : 'text'
    });
  }


  /**
   * Удаление существующего структурного подразделения по ID
   * 
   * @param id идентификатор структурного подразделения
   * @returns http-ответ
   */
  delete(id : number) : Observable<string> {
    return this.http.delete(DEPARTMENTS_API_URL + `/${id}`, {
      responseType : 'text'
    })
  }
}
