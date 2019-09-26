import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/models/usuario.model';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.less']
})
export class NavbarComponent implements OnInit
{
  user: Usuario;
  profilePath: string = 'profile';

  constructor(private router: Router,
    public _cartService: ShoppingCartService,
    public _userService: UsuarioService,
    public _storeService: StoreService
  )
  {
    if (this._userService.user)
    {
      try {
        this.profilePath = _userService.user.access.length > 0 ? 'admin' : 'profile';
      } catch (e) {
          this.profilePath = 'profile';
        }
    }
  }


  ngOnInit()
  {

  }


  logoutUser()
  {
    this._userService.logoutUser();
    this._storeService.quitStore();
  }


}
