import { Component, OnInit } from '@angular/core';
import { CamaleonService } from 'src/app/services/camaleon.service';
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
    private camaleonService: CamaleonService,
    private cartService: ShoppingCartService,
    public _userService: UsuarioService)
  {
    this.storesLine1 = this.camaleonService.getStoresLine1();
  }
  ngOnInit()
  {
    
  }

  goStore(store: any)
  {
    this.router.navigate(['/store', store.id]);
  }

  goAbout()
  {
    this.router.navigate(['/about']);
  }

  goContact()
  {
    this.router.navigate(['/contact']);
  }

  logoutUser()
  {
    this._userService.logoutUser();
  }


}
