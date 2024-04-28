import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Responsible } from '../../models/responsible/responsible';
import { Department } from '../../models/department/department';

const API_URL = 'http://localhost:8080/api/v1'

@Injectable({
  providedIn: 'root'
})
export class ResponsibleService {

  constructor(private http : HttpClient) { }

  /**
   * Получение списка записей ответственных
   * 
   * @returns список ответственных
   */
  getAll(params? : any) : Observable<Responsible[]> {  
    return this.http.get<Responsible[]>(API_URL + '/responsible', {
      params : params ? this.getHttpParams(params) : {}
    });
  }

  
  /**
   * Получение списка ответственных по структурному подразделению
   * 
   * @param department структурное подразделение
   * @returns список ответственных
   */
  getAllByDepartment(department : Department) : Observable<Responsible[]> {
    return this.http.get<Responsible[]>(API_URL + `/departments/${department.id}/responsible`);
  }
  
  /**
   * Получение списка ответственных по материальной ответственности
   * 
   * @param isFinanciallyResponsible материальная ответственность
   * @returns список ответственных
   */
  getAllByFinanciallyResponsibility(isFinanciallyResponsible : boolean) {
    return this.http.get<Responsible[]>(API_URL + '/responsible', {
      params: {
        isFinanciallyResponsible : isFinanciallyResponsible
      }
    });
  }

  getByPrincipal() {
    return this.http.get<any>(API_URL + "/responsible/current-user");
  }

  /**
   * Создание нового ответственного
   * 
   * @param responsible ответственный
   * @returns http-ответ
   */
  create(responsible : Responsible) : Observable<string> {
    return this.http.post(API_URL + '/responsible', responsible, {
      responseType : 'text'
    });
  }

  /**
   * Обновление информации об ответсвенном по ID
   * 
   * @param responsible ответственный
   * @returns http-ответ
   */
  update(responsible : Responsible) : Observable<string> {
    return this.http.put(API_URL + '/responsible', responsible, {
      responseType : 'text'
    });
  }

  /**
   * Удаление информации об ответсвенном
   * 
   * @param id идентификатор ответственного
   * @returns http-ответы
   */
  delete(id : number) : Observable<string> {
    return this.http.delete(API_URL + `/responsible/${id}`, {
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
