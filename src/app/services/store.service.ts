import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../config/config';
import { map, catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { throwError } from 'rxjs';
import { Store } from '../models/store.model';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class StoreService
{
  store: Store;

  constructor(
    public httpClient: HttpClient,
    public _storeService: StoreService
  )
  {
    this.loadStorage();
  }


  loadStorage()
  {
    if (localStorage.getItem('token'))
    {
      this.store = JSON.parse(localStorage.getItem('store'));
    }
    else
    {
      this.store = null;
    }
  }


  getStores()
  {
    let url = URL_SERVICIOS + '/store';

    return this.httpClient.get(url).pipe(map((resp: any) =>
    {
      return resp.documents;
    }));
  }


  getStore(id: string)
  {
    let url = URL_SERVICIOS + '/store/' + id;

    return this.httpClient.get(url)
      .pipe(map((resp: any) =>
      {
        return resp.document;
      }));
  }


  getStoreByCodeName(pCodeName: string)
  {
    console.log('va a buscar esta mierda');

    let url = URL_SERVICIOS + '/store/name/' + pCodeName;

    return this.httpClient.get(url)
      .pipe(map((resp: any) =>
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

    return this.httpClient.get(url)
      .pipe(map((resp: any) =>
      {
        return resp.documents;
      }));
  }

  getPreferredStore(userAccesses)
  {
    for (const oneAccess of userAccesses)
    {
      if (oneAccess.preferred)
      {
        return oneAccess._storeId;
      }
    }
  }


  quitStore(): void
  {
    localStorage.removeItem('store');
  }


  setPreferredStore(user: Usuario): void
  {
    if (user)
    {
      const access = user.access;
      if (access)
      {
        if (access.length > 0)
        {
          for (const oneAccess of access)
          {
            if (oneAccess.preferred)
            {
              this.getStore(oneAccess._storeId)
                .subscribe(resp =>
                {
                  this.store = resp;
                  localStorage.setItem('store', JSON.stringify(this.store));
                });

              break;
            }
          }
        }
      }
    }
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


  saveStore2(formData: any)
  {
    let url = URL_SERVICIOS + '/store';

    return this.httpClient.post(url, formData)
      .pipe(
        map((resp: any) =>
        {
          Swal.fire('Tienda creada!', 'Tu tienda se ha creado con éxito :D', 'success');
          this.store = resp.document;
          localStorage.setItem('store', JSON.stringify(resp.document));
          return resp;
        }),
        catchError(err =>
        {
          let message: string = this.getErrorMessage(err);
          Swal.fire('Error al registrar', message, 'error');
          return throwError(err);
        }));
  }


  updateStore(id, formData: any)
  {
    let url = URL_SERVICIOS + '/store/' + id;

    return this.httpClient.put(url, formData)
      .pipe(
        map((resp: any) =>
        {
          this.store = resp.document;
          localStorage.setItem('store', JSON.stringify(resp.document));
          return resp;
        }),
        catchError(err =>
        {
          let message: string = this.getErrorMessage(err);
          Swal.fire('Error actualizando tu tienda', message, 'error');
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
