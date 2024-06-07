import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../enviroments/enviroment';

const PLACEMENTS_API_URL = `${environment.getBaseUrl()}/api/v1/placements`

@Injectable({
  providedIn: 'root'
})
export class PlacementService {

  constructor(private http : HttpClient) { }

  /**
   * Получение списка записей помещений
   * 
   * @returns список помещений
   */
  getAll() : Observable<any[]> {
    return this.http.get<any[]>(PLACEMENTS_API_URL);
  }

  /**
   * Получение спика записей помещений по названию
   * 
   * @param name название помещения
   * @returns 
   */
  getAllByNameStartingWith(name : string) : Observable<any[]> {
    return this.http.get<any[]>(PLACEMENTS_API_URL, {
      params : { name : name }  
    });
  }

  /**
   * Создание нового помещения
   * 
   * @param placement новое помещение
   * @returns http-ответ
   */
  create(placement : any) : Observable<string> {
    return this.http.post(PLACEMENTS_API_URL, placement, {
      responseType : 'text'
    });
  } 

  /**
   * Обновление существующего помещения по ID
   * 
   * @param placement новая информация о помещении
   * @returns http-ответ
   */
  update(placement : any) : Observable<string> {
    return this.http.put(PLACEMENTS_API_URL, placement, {
      responseType : 'text'
    });
  }


  /**
   * Удаление существующего помещения по ID
   * 
   * @param id идентификатор помещения
   * @returns http-ответ
   */
  delete(id : number) : Observable<string> {
    return this.http.delete(PLACEMENTS_API_URL + `/${id}`, {
      responseType : 'text'
    })
  }
}
