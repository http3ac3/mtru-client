import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Equipment } from '../../models/equipment/equipment';

const EQUIPMENT_API_URL = 'http://localhost:8080/api/v1/equipment'

@Injectable({
  providedIn: 'root'
})
export class EquipmentService {

  constructor(private http : HttpClient) { }

  /**
   * Получение списка записей оборудования 
   * 
   * @param params необязательные параметры
   * @returns список оборудования
   */
  getAll(params? : any) : Observable<any[]> {
    return this.http.get<any[]>(EQUIPMENT_API_URL, {
      params : params ? this.getHttpParams(params) : {}
    })
  }

  /**
   * Создание нового оборудования
   * 
   * @param equipment новое оборудование
   * @returns http-ответ 
   */
  create(equipment : any) : Observable<string> {
    return this.http.post(EQUIPMENT_API_URL, equipment, { responseType: 'text'});
  }

  
  /**
   * Обновление информации об оборудовании по ID
   * 
   * @param equipment оборудование
   * @returns http-ответ
   */
  update(equipment : any) : Observable<string> {
    return this.http.put(EQUIPMENT_API_URL + `/${equipment.id}`, equipment, { responseType: 'text'});
  }

  
  /**
   * Удаление оборудования по ID
   * 
   * @param id иденитификатор оборудования
   * @returns http-ответ
   */
  delete(id : number) : Observable<string> {
    return this.http.delete(EQUIPMENT_API_URL + `/${id}`, { responseType: 'text'});
  }

  /**
   * Создает из списка параметров объект типа HttpParams
   * 
   * @param params список параметров
   * @returns объект HttpParams
   */
  getHttpParams(params : any) : HttpParams {
    let httpParams : HttpParams  = new HttpParams();
    Object.keys(params).forEach(key => { 
        if (params[key] !== null)
          httpParams = httpParams.append(key , params[key]);  
    });
     return httpParams;
  } 
}
