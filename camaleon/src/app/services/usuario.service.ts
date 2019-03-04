import { Injectable, Output } from '@angular/core';
import { Usuario } from '../models/usuario.model.js';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../config/config';

import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { EventEmitter } from 'events';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService
{
  user: Usuario;
  token: string;

  @Output() getLogged: EventEmitter = new EventEmitter();

  constructor(public httpClient: HttpClient, public router: Router)
  {
    this.loadStorage();
  }

  isLogged()
  {
    return this.token.length > 5 ? true : false
  }

  loadStorage()
  {
    if (localStorage.getItem('token'))
    {
      this.token = localStorage.getItem('token');
      this.user = JSON.parse(localStorage.getItem('user'));
    }
    else
    {
      this.token = '';
      this.user = null;
    }
  }

  registerUser(usuario: Usuario)
  {
    let url = URL_SERVICIOS + '/user';

    return this.httpClient.post(url, usuario).pipe(map((resp: any) =>
    {
      Swal.fire('Usuario creado', usuario.email, 'success');
      return resp;
    }));
  }

  loginUser(usuario: Usuario, rememberme: boolean)
  {
    if (rememberme)
    {
      localStorage.setItem('email', usuario.email);
    }
    else
    {
      localStorage.removeItem('email');
    }

    let url = URL_SERVICIOS + '/login';

    return this.httpClient.post(url, usuario).pipe(map((resp: any) =>
    {
      localStorage.setItem('id', resp.id);
      localStorage.setItem('token', resp.token);
      localStorage.setItem('user', JSON.stringify(resp.user));

      this.user = resp.user;
      this.token = resp.token;

      return true;
    }));
  }

  logoutUser()
  {
    this.user = null;
    this.token = '';

    localStorage.removeItem('user');
    localStorage.removeItem('token');

    this.router.navigate(['/login']);
  }

  updateUser(usuario: Usuario)
  {
    let url = URL_SERVICIOS + '/user/' + usuario._id;

    return this.httpClient.put(url, usuario).pipe(map((resp: any) =>
    {
      Swal.fire('Usuario actualizado', usuario.email, 'success');
      return resp;
    }));
  }

}
