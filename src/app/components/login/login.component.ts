import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { Usuario } from '../../models/usuario.model.js';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service.js';
import Swal from 'sweetalert2';
import { FileService } from 'src/app/services/file.service.js';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit
{

  email: string;
  rememberme: boolean = false;

  forma2: FormGroup;
  usuario: Usuario;

  constructor(
    public router: Router,
    public _usuarioService: UsuarioService,
    public _fileService: FileService
  )
  {

  }

  ngOnInit()
  {
    window.scrollTo(0, 0);

    this.forma2 = new FormGroup({
      name: new FormControl(null, Validators.required),
      email2: new FormControl(null, [Validators.required, Validators.email]),
      lastName: new FormControl(null, Validators.required),
      password2: new FormControl(null, Validators.required),
    });

    //cuando inicia sesión, lo debe llevar al home
    if (localStorage.getItem('user'))
    {
      if (localStorage.getItem('pendingCheckout'))
      {
        localStorage.removeItem('pendingCheckout');
        this.router.navigate(['/checkout']);
      }
      else
      {
        this.router.navigate(['/home']);
      }
    }


    this.email = localStorage.getItem('email') || '';

    if (this.email.length > 1)
    {
      this.rememberme = true;
    }

  }


  registerUser()
  {
    const formaValue = this.forma2.value;

    let usuario = new Usuario(formaValue.name, formaValue.lastName, formaValue.email2.trim().toLowerCase(), formaValue.password2);

    this._usuarioService.registerUser(usuario)
      .subscribe(resp =>
      {
        Swal.fire({
          title: 'Usuario creado',
          text: usuario.email,
          type: 'success',
          confirmButtonText: 'Ok'
        }).then((result) =>
        {
          if (result.value)
          {
            this._usuarioService.loginUser(usuario)
              .subscribe(resp =>
              {
                window.location.reload();
              });
          }
        });

      });
  }


  loginUser(forma: NgForm)
  {
    let usuario = new Usuario(null, null, forma.value.email1.trim().toLowerCase(), forma.value.password1);

    this._usuarioService.loginUser(usuario, forma.value.rememberme)
      .subscribe(resp =>
      {
        window.location.reload();
      });
  }


  downloadFile()
  {
    this._fileService.downloadPoliticas()
      .subscribe(
        data => saveAs(data, 'politicaTratamientoDatos.pdf'),
        error => console.error(error)
      );
  }

}
