import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { Usuario } from '../../models/usuario.model.js';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service.js';
import Swal from 'sweetalert2';
import { FileService } from 'src/app/services/file.service.js';
import { saveAs } from 'file-saver';
import { REGEX_EMAIL } from '../../constants/constants';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit
{
  formLogin: FormGroup;
  formRegister: FormGroup;
  usuario: Usuario;


  constructor(
    public router: Router,
    public _usuarioService: UsuarioService,
    public _fileService: FileService,
    private titleService: Title,
    private meta: Meta)
  {

  }


  ngOnInit()
  {
    this.titleService.setTitle('Ingresar');
    this.meta.addTag({name: 'keywords', content: 'Camaleon.shop, Camaleon, Ingresar, Registro, Vender, Login'});
    this.meta.addTag({name: 'description', content: 'Ingresar a mi cuenta o registrarme. Quiero vender!'});
    this.meta.addTag({name: 'robots', content: 'all, follow'});

    window.scrollTo(0, 0);

    this.formLogin = new FormGroup({
      email1: new FormControl(null, [Validators.required, Validators.email]),
      password1: new FormControl(null, Validators.required),
      rememberMe: new FormControl(false),
    });

    this.formRegister = new FormGroup({
      name: new FormControl(null, Validators.required),
      email2: new FormControl(null, [Validators.required, Validators.email]),
      lastName: new FormControl(null, Validators.required),
      password2: new FormControl(null, Validators.required),
      createStore: new FormControl(false)
    });

    //cuando inicia sesión, lo debe llevar al home
    if (localStorage.getItem('user'))
    {
      if (localStorage.getItem('createStore'))
      {
        localStorage.removeItem('createStore');
        this.router.navigate(['/admin/store']);
      }

      else if (localStorage.getItem('pendingCheckout'))
      {
        localStorage.removeItem('pendingCheckout');
        this.router.navigate(['/checkout']);
      }
      else
      {
        this.router.navigate(['/home']);
      }
    }

    this.formLogin.get('email1').setValue(localStorage.getItem('email') || '');
    this.formLogin.get('rememberMe').setValue(localStorage.getItem('email') ? true : false);

    // if (this.email.length > 1)
    // {
    //   this.rememberme = true;
    // }
  }


  onRegisterUser()
  {
    const formRegisterValue = this.formRegister.value;

    //validate email
    const email = formRegisterValue.email2.trim().toLowerCase();

    if (REGEX_EMAIL.test(String(email).toLowerCase()))
    {
      let usuario = new Usuario(formRegisterValue.name, formRegisterValue.lastName, email, formRegisterValue.password2);

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
                  if (formRegisterValue.createStore)
                  {
                    localStorage.setItem('createStore', 'true');
                  }

                  window.location.reload();
                });
            }
          });
        });
    }
    else
    {
      Swal.fire('Oops', 'El correo no parece un correo e_e. Recuerda que debe tener un patrón como micorreo@dominio.com', 'warning');
    }
  }


  onLoginUser()
  {
    const formLoginValue = this.formLogin.value;

    let usuario = new Usuario(null, null, formLoginValue.email1.trim().toLowerCase(), formLoginValue.password1);

    this._usuarioService.loginUser(usuario, formLoginValue.rememberMe)
      .subscribe(resp =>
      {
        window.location.reload();
      });
  }


}
