import { Component, OnInit } from '@angular/core';
import { CamaleonService } from 'src/app/services/camaleon.service';
import { Router } from '@angular/router';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit
{

  storesLine1: any[] = [];

  constructor(private router: Router, private camaleonService: CamaleonService, private cartService: ShoppingCartService)
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


}
