import { Injectable, Output, EventEmitter } from '@angular/core';
import { Usuario } from '../models/usuario.model.js';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../config/config';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { UserAccess } from '../models/userAccess.model.js';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService
{
  user: Usuario;
  token: string;

  //--------------------------------------------------------------------------------------------------------- METODOS
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


  getUser(id: string)
  {
    let url = URL_SERVICIOS + '/user/' + id;

    return this.httpClient.get(url)
      .pipe(
        map((resp: any) =>
        {
          return resp;
        })
        ,
        catchError(err =>
        {
          let message: string = this.getErrorMessage(err);
          Swal.fire('Error al consultar usuario', message, 'error');
          return throwError(err);
        })
      );
  }


  saveUser(usuario: Usuario)
  {
    let url = URL_SERVICIOS + '/user';

    return this.httpClient.post(url, usuario)
      .pipe(
        map((resp: any) =>
        {
          return resp;
        })
        ,
        catchError(err =>
        {
          let message: string = this.getErrorMessage(err);
          Swal.fire('Error al registrar', message, 'error');
          return throwError(err);
        })
      );
  }


  loginUser(usuario: Usuario, rememberme?: boolean)
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

    return this.httpClient.post(url, usuario)
      .pipe(
        map((resp: any) =>
        {
          localStorage.setItem('token', resp.token);
          localStorage.setItem('user', JSON.stringify(resp.user));

          this.user = resp.document;
          this.token = resp.token;

          return true;
        }),
        catchError(err =>
        {
          let message: string = this.getErrorMessage(err);
          Swal.fire('Error al ingresar', message, 'error');
          return throwError(err);
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

    return this.httpClient.put(url, usuario)
      .pipe(
        map((resp: any) =>
        {
          this.user = resp.document;
          localStorage.setItem('user', JSON.stringify(resp.document));

          Swal.fire('Usuario actualizado', usuario.email, 'success');
          return resp;
        }),
        catchError(err =>
        {
          Swal.fire('Error al actualizar', err.error.message, 'error');
          return throwError(err);
        }));
  }


  addUserAccess(params)
  {
    var userAccess = {
      "roles": [
        params.role
      ],
      "preferred": params.preferred,
      "_storeId": params.storeId
    }

    this.user = JSON.parse(localStorage.getItem('user'));

    if (this.user)
    {
      this.user.access = [userAccess];
      localStorage.setItem('user', JSON.stringify(this.user));
    }
  }


  getErrorMessage(err: any): string
  {
    console.log('borrar - err ::: ' + JSON.stringify(err));

    let resp = '';

    if (err.error)
    {
      if (err.error.errors.errors)
      {
        if (err.error.errors.name === 'ValidationError')
        {
          resp = err.error.errors.message.split(':')[2];

          if (resp.includes('email'))
          {
            resp = resp.replace('email', 'correo');
          }
        }
      }
      else
      {
        resp = err.error.message;
      }
    }

    return resp;
  }

}
