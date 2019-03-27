import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../config/config.js';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ItemService
{

  constructor(public httpClient: HttpClient) { }


  getItems(from: number, limit: number)
  {
    let url = URL_SERVICIOS + '/item';

    if (from && limit)
    {
      url += '?from=' + from + '&limit=' + limit;
    }

    return this.httpClient.get(url).pipe(map((resp: any) =>
    {
      return resp.documents;
    }));
  }


  getItem(pItemId: String)
  {
    let url = URL_SERVICIOS + '/item/' + pItemId;

    return this.httpClient.get(url).pipe(map((resp: any) =>
    {
      return resp.document;
    }));
  }


  getItemsByStore(pStoreName: String, from: number, limit: number)
  {
    let url = URL_SERVICIOS + '/item/store/' + pStoreName;

    if (from !== null && limit !== null)
    {
      url += '?from=' + from + '&limit=' + limit;
    }

    return this.httpClient.get(url).pipe(map((resp: any) =>
    {
      return resp.documents;
    }));
  }
}
