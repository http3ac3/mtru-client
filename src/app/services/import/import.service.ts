import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { environment } from '../../../enviroments/enviroment';

const IMPORT_URL = `${environment.getBaseUrl()}/api/v1/import`

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
    formData.append('file', data.file);
    if (data.autoResponsible != null)
      formData.append('autoResponsibleId', data.autoResponsible);
    if (data.autoPlacement != null)
      formData.append('autoPlacementId', data.autoPlacement);
    if (data.autoCommissioningDate != null)
      formData.append('autoCommissioningDate', data.autoCommissioningDate);
    if (data.autoCommissioningActNumber != null)
      formData.append('autoCommissioningActNumber', data.autoCommissioningActNumber);
    return formData;
  }
}
