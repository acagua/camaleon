import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import Swal from 'sweetalert2';
import { PasswordService } from '../password.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class PasswordNewGuard implements CanActivate
{

  constructor(public _passwordService: PasswordService, public router: Router)
  {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>
  {
    var token = route.queryParams.token;

    return this._passwordService.verifyToken(token).pipe(
      map(result =>
      {
        if (result)
        {
          if (result.code === 202)
          {
            Swal.fire('Oops', 'Este link ha expirado', 'warning');
            this.router.navigate(['/home']);
            return false;
          }
          else
          {
            localStorage.setItem('passwordNewToken', token);
            return true;
          }
        }
        else
        {
          this.router.navigate(['/login']);
          return false;
        }
      })
    );
  }


}
