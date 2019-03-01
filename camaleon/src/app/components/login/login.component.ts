import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Usuario } from '../../models/usuario.model.js';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service.js';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit
{

  forma2: FormGroup;
  usuario: Usuario;

  constructor(public router: Router, public _usuarioService: UsuarioService) { }

  ngOnInit()
  {
    this.forma2 = new FormGroup({
      name: new FormControl(null, Validators.required),
      email2: new FormControl(null, [Validators.required, Validators.email]),
      password2: new FormControl(null, Validators.required),
    });
  }

  registerUser()
  {
    console.log(this.forma2);
    console.log(this.forma2.value);
    console.log(this.forma2.valid);

    const formaValue = this.forma2.value;

    let usuario = new Usuario(formaValue.name, formaValue.email2, formaValue.password2);

    this._usuarioService.registerUser(usuario)
      .subscribe(resp =>
      {
        console.log(resp);
      });
  }

}
