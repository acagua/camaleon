import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit
{
  user: Usuario;
  storesLine1: any[] = [];

  constructor(private router: Router,
    private _cartService: ShoppingCartService,
    public _userService: UsuarioService)
  {
    
  }
  ngOnInit()
  {

  }


  logoutUser()
  {
    this._userService.logoutUser();
  }


}
