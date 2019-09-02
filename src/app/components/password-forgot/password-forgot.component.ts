import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { PasswordService } from 'src/app/services/password.service';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-password-forgot',
  templateUrl: './password-forgot.component.html',
  styleUrls: ['./password-forgot.component.css']
})
export class PasswordForgotComponent implements OnInit
{
  formForgot: FormGroup;

  constructor(public _passwordService: PasswordService,
    private titleService: Title,
    private meta: Meta) { }

  ngOnInit()
  {
    this.titleService.setTitle('Recuperar Contraseña');
    this.meta.addTag({name: 'keywords', content: 'Camaleon.shop, Camaleon, Contraseña, Olvidé contraseña, Olvide contraseña, Recuperar, Recuperar contraseña, Olvidé clave, Recuperar clave'});
    this.meta.addTag({name: 'description', content: 'Olvidé mi clave de ingreso'});
    this.meta.addTag({name: 'robots', content: 'all, follow'});
    window.scrollTo(0, 0);

    this.formForgot = new FormGroup({
      email: new FormControl(null, Validators.required)
    });
  }

  askNewPassword()
  {
    const formForgotValue = this.formForgot.value;

    let email = formForgotValue.email.trim();

    this._passwordService.askNewPassword(email)
      .subscribe(resp =>
      {
        Swal.fire('Listo!', 'Un correo ha sido enviado para que recuperes tu contraseña :D', 'success');
      });
  }

}
