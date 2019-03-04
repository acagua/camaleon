import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../usuario.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate
{

  constructor(public _userService: UsuarioService, public router: Router)
  {

  }

  canActivate()
  {
    if (this._userService.isLogged())
    {
      console.log('paso por el loginguard');

      return true;
    }
    else
    {
      console.log('bloqueado por el loginguard');

      this.router.navigate(['/login']);

      return false;
    }

  }
}
