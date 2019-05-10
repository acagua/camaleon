import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../config/config';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StoreService
{

  constructor(public httpClient: HttpClient) { }


  getStores()
  {
    let url = URL_SERVICIOS + '/store';

    return this.httpClient.get(url).pipe(map((resp: any) =>
    {
      return resp.documents;
    }));
  }


  getStore(pCodeName: String)
  {
    let url = URL_SERVICIOS + '/store/name/' + pCodeName;

    return this.httpClient.get(url).pipe(map((resp: any) =>
    {
      return resp.document;
    }));
  }


  getStoresRandom(limit: number)
  {
    let url = URL_SERVICIOS + '/store/random/normal';

    if (limit !== null)
    {
      url += '?limit=' + limit;
    }

    return this.httpClient.get(url).pipe(map((resp: any) =>
    {
      return resp.documents;
    }));
  }


  getStoresRandomByCategory(pCategoryId: String, limit: number)
  {
    let url = URL_SERVICIOS + '/store/random/category/' + pCategoryId;

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
