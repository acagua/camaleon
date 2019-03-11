import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/models/usuario.model';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit
{

  user: Usuario;

  constructor(public _userService: UsuarioService)
  {
    this.user = this._userService.user;
  }

  ngOnInit()
  {

  }

  saveChanges(forma: FormGroup)
  {
    this.user.name = forma.value.name;
    this.user.email = forma.value.email;

    this._userService.updateUser(this.user)
      .subscribe(resp =>
      {
        console.log(resp)
      });
  }

}
