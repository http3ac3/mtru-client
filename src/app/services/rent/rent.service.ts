import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rent } from '../../models/rent/rent';

const RENT_API_URL = 'http://localhost:8080/api/v1/rents'

@Injectable({
  providedIn: 'root'
})
export class RentService {

  constructor(private http : HttpClient) { }

  /**
   * Получение списка записей всех взятий
   * 
   * @param params необязательные параметры запроса
   * @returns список взятий
   */
  getAll(params? : any) : Observable<Rent[]> {
    return this.http.get<Rent[]>(RENT_API_URL, {
      params : params ? this.getHttpParams(params) : {}
    });
  }

  /**
   * Создание нового взятия
   * 
   * @param rent взятие
   * @returns http-ответ
   */
  create(rent : Rent) : Observable<string> {
    return this.http.post(RENT_API_URL, rent, {
      responseType : 'text'
    });
  }

  /**
   * Обновление взятия по ID
   * 
   * @param rent новая информация о взятии
   * @returns http-ответ
   */
  update(rent : Rent) : Observable<string> {
    return this.http.put(RENT_API_URL + `/${rent.id}`, rent, {
      responseType : 'text'
    });
  }

  /**
   * Удаление взятия по ID
   * 
   * @param id идентификатор взятия
   * @returns http-ответ
   */
  delete(id : number) : Observable<string> {
    return this.http.delete(RENT_API_URL + `/${id}`, {
      responseType : 'text'
    });
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
