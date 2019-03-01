import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario.model.js';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../config/config';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService
{

  constructor(public httpClient: HttpClient) { }

  registerUser(usuario: Usuario)
  {
    let url = URL_SERVICIOS + '/user';

    return this.httpClient.post(url, usuario).pipe(map((resp: any) =>
    {
      Swal.fire('Usuario creado', usuario.email, 'success');
      return resp;
    }));
  }
}
