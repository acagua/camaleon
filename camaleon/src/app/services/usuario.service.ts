import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario.model.js';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService
{

  constructor() { }

  registerUser(usuario: Usuario)
  {
    alert(usuario);
  }
}
