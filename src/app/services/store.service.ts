import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../config/config';
import { map, catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { throwError } from 'rxjs';
import { Store } from '../models/store.model';

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


  saveStore(store: Store)
  {
    let url = URL_SERVICIOS + '/store';

    return this.httpClient.post(url, store)
      .pipe(
        map((resp: any) =>
        {
          return resp;
        }),
        catchError(err =>
        {
          let message: string = this.getErrorMessage(err);
          Swal.fire('Error al registrar', message, 'error');
          return throwError(err);
        }));
  }


  getErrorMessage(err: any): string
  {
    let resp = '';

    resp = JSON.stringify(err);

    return resp;
  }


}
