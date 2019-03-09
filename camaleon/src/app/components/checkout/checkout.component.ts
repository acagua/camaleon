import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html'
})
export class CheckoutComponent implements OnInit
{

  user: Usuario;

  constructor(public _userService: UsuarioService, public _shoppingCartService: ShoppingCartService)
  {
    if (this._userService.user)
    {
      this.user = this._userService.user;
    }
  }

  ngOnInit()
  {
    window.scrollTo(0, 0);
  }

}
