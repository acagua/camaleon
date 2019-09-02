import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { UsuarioService } from 'src/app/services/usuario.service';
import { PasswordService } from 'src/app/services/password.service';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-password-new',
  templateUrl: './password-new.component.html',
  styleUrls: ['./password-new.component.css']
})
export class PasswordNewComponent implements OnInit
{

  formNew: FormGroup;

  constructor(public _passwordService: PasswordService) { }

  ngOnInit()
  {
    window.scrollTo(0, 0);

    this.formNew = new FormGroup({
      password1: new FormControl(null, Validators.required),
      password2: new FormControl(null, Validators.required)
    });
  }

  newPassword()
  {
    const formNewValue = this.formNew.value;

    const password1 = formNewValue.password1;
    const password2 = formNewValue.password2;

    if (password1 === password2)
    {
      var token = localStorage.getItem('passwordNewToken');

      if (token)
      {
        this._passwordService.newPassword(token, password1)
          .subscribe(result =>
          {
            console.log(result);
          });
      }
      else
      {
        Swal.fire('Oops', 'Algo no está saliendo bien e_e', 'warning');
      }
    }
    else
    {
      Swal.fire('Oops', 'Las contraseñas deben coincidir', 'warning');
    }
  }

}
