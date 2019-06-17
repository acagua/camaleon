import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { PasswordService } from 'src/app/services/password.service';

@Component({
  selector: 'app-password-forgot',
  templateUrl: './password-forgot.component.html'
})
export class PasswordForgotComponent implements OnInit
{
  formForgot: FormGroup;

  constructor(public _passwordService: PasswordService) { }

  ngOnInit()
  {
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
