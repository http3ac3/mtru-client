import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Placement } from '../../models/placement/placement';

const PLACEMENTS_API_URL = 'http://localhost:8080/api/v1/placements'

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
  getAll() : Observable<Placement[]> {
    return this.http.get<Placement[]>(PLACEMENTS_API_URL + '/all');
  }

  /**
   * Создание нового помещения
   * 
   * @param placement новое помещение
   * @returns http-ответ
   */
  create(placement : Placement) : Observable<string> {
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
  update(placement : Placement) : Observable<string> {
    return this.http.put(PLACEMENTS_API_URL + `/${placement.id}`, placement, {
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