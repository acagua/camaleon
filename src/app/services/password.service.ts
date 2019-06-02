import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../config/config';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PasswordService
{
  constructor(public httpClient: HttpClient) { }

  askNewPassword(email: String)
  {
    let url = URL_SERVICIOS + '/password';

    return this.httpClient.post(url, { email: email })
      .pipe(
        map((resp: any) =>
        {
          return resp;
        }),
        catchError(err =>
        {
          let message: string = this.getErrorMessage(err);
          Swal.fire('Oops', message, 'error');
          return throwError(err);
        }));
  }


  verifyToken(token: String)
  {
    let url = URL_SERVICIOS + '/password/verify';

    return this.httpClient.post(url, { token: token })
      .pipe(
        map((resp: any) =>
        {
          return resp;
        }),
        catchError(err =>
        {
          return throwError(err);
        }));
  }


  newPassword(token: String, password: String)
  {
    let url = URL_SERVICIOS + '/password/new';

    return this.httpClient.post(url, { token: token, password: password })
      .pipe(
        map((resp: any) =>
        {
          Swal.fire('Contraseña Actualizada', 'Ahora inicia sesión', 'success');
          return resp;
        }),
        catchError(err =>
        {
          return throwError(err);
        }));
  }


  getErrorMessage(err: any): string
  {
    let resp = '';

    if (err.status === 404)
    {
      resp = 'Este correo no está en nuestras bases de datos e_e';
    }
    else
    {
      resp = JSON.stringify(err);
    }

    return resp;
  }


}
