import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario.model.js';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService
{

  constructor(public httpClient: HttpClient) { }

  registerUser(usuario: Usuario)
  {
    let url = URL_SERVICIOS + '/usuario';

    return this.httpClient.post(url, usuario);

    //Swal.fire('Good job!', 'You clicked the button!', 'success');
  }
}
