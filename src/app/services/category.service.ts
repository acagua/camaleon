import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../config/config';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService
{

  constructor(public httpClient: HttpClient)
  {
  }


  getCategory(pIdCategory: String)
  {
    let url = URL_SERVICIOS + '/category/' + pIdCategory;

    return this.httpClient.get(url).pipe(map((resp: any) =>
    {
      return resp.document;
    }));
  }
}
