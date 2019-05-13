import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../config/config.js';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FileService
{

  constructor(public httpClient: HttpClient) { }


  downloadPoliticas()
  {
    let url = URL_SERVICIOS + '/file/politicas';

    return this.httpClient.get(url, { responseType: 'blob' });
  }
}
