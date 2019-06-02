import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../config/config';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenService
{

  constructor(public httpClient: HttpClient) { }

  createToken(email: String)
  {
    let url = URL_SERVICIOS + '/token';

    return this.httpClient.post(url, email)
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

    resp = err;

    return resp;
  }
}
