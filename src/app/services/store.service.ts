import { Injectable, Output, EventEmitter } from '@angular/core';
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


}
