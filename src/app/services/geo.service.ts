import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../config/config.js';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GeoService
{

  constructor(public httpClient: HttpClient) { }


  getDepartments()
  {
    let url = URL_SERVICIOS + '/geo/departments';

    return this.httpClient.get(url)
      .pipe(
        map((resp: any) =>
        {
          return resp.documents;
        })
      );
  }


  getCitiesFromDepartment(departmentCode: String)
  {
    let url = URL_SERVICIOS + '/geo/cities/' + departmentCode;

    return this.httpClient.get(url)
      .pipe(
        map((resp: any) =>
        {
          return resp.documents;
        })
      );
  }

}
