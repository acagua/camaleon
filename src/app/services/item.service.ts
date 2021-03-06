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

    console.log(url);

    return this.httpClient.get(url).pipe(map((resp: any) =>
    {
      return resp.document;
    }));
  }


  getItemsByStoreCodeName(pStoreName: String, from: number, limit: number)
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


  getItemsRandomForHome(limit?: number)
  {
    let url = URL_SERVICIOS + '/item/random/home/';

    if (limit !== null)
    {
      url += '?limit=' + limit;
    }

    return this.httpClient.get(url).pipe(map((resp: any) =>
    {
      return resp.documents;
    }));
  }


  getItemsRandomByStoreId(pStoreId: String, limit?: number)
  {
    let url = URL_SERVICIOS + '/item/random/store/' + pStoreId;

    if (limit !== null)
    {
      url += '?limit=' + limit;
    }

    return this.httpClient.get(url).pipe(map((resp: any) =>
    {
      return resp.documents;
    }));
  }


  getItemsRandomByCategory(pCategoryId: String, limit?: number)
  {
    let url = URL_SERVICIOS + '/item/random/category/' + pCategoryId;

    if (limit !== null)
    {
      url += '?limit=' + limit;
    }

    return this.httpClient.get(url).pipe(map((resp: any) =>
    {
      return resp.documents;
    }));
  }


  getItemsByCategory(pCategoryId: String, from?: number, limit?: number)
  {
    let url = URL_SERVICIOS + '/item/category/' + pCategoryId;

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
