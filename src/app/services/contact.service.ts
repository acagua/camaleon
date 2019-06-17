import { Injectable } from '@angular/core';
import { ContactMessage } from '../models/contactMessage.model';
import { URL_SERVICIOS } from '../config/config';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService
{
  constructor(public httpClient: HttpClient) { }

  sendContactMessage(contactMessage: ContactMessage)
  {
    let url = URL_SERVICIOS + '/contactMessage';

    return this.httpClient.post(url, contactMessage)
      .pipe(
        map((resp: any) =>
        {
          return resp;
        }),
        catchError(err =>
        {
          let message = this.getErrorMessage(err);
          Swal.fire('Error al registrar', message, 'error');
          return throwError(err);
        }));
  }


  getErrorMessage(err: any)
  {
    let resp = '';

    resp = err.message;

    return resp;
  }
}