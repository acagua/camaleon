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


  getCategories()
  {
    let url = URL_SERVICIOS + '/category';

    return this.httpClient.get(url).pipe(map((resp: any) =>
    {
      return resp.documents;
    }));
  }


  getCategoriesRandom(limit: number)
  {
    let url = URL_SERVICIOS + '/category/random/normal';

    if (limit !== null)
    {
      url += '?limit=' + limit;
    }

    return this.httpClient.get(url).pipe(map((resp: any) =>
    {
      return resp.documents;
    }));
  }
}
