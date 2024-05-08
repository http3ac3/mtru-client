import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';

const IMPORT_URL = 'http://localhost:8080/api/v1/import'

@Injectable({
  providedIn: 'root'
})
export class ImportService {

  constructor(private http : HttpClient) { }

  public importFromExcel(data : any) : Observable<any> {
    let formData = this.convertToFormData(data);
    return this.http.post<any>(IMPORT_URL + '/excel', formData);
  }

  private convertToFormData(data : any) : FormData {
    let formData = new FormData();
    formData.append('file', data);
    return formData;
  }
}
