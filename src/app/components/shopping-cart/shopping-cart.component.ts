import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { ItemCart } from 'src/app/models/item-cart.model';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html'
})
export class ShoppingCartComponent implements OnInit
{

  constructor(private router: Router, private _cartService: ShoppingCartService)
  {

  }

  removeItem(index: number, itemCart: any)
  {
    
  }

  ngOnInit()
  {
  }

}
