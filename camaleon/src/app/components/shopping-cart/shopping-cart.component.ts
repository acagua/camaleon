import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html'
})
export class ShoppingCartComponent implements OnInit
{

  itemsCart: any[] = [];
  total: number = 0;

  constructor(private router: Router, private cartService: ShoppingCartService)
  {
    if (localStorage.getItem('cart'))
    {
      this.itemsCart = JSON.parse(localStorage.getItem('cart'));

      for (let i = 0; i < this.itemsCart.length; i++)
      {
        const element = this.itemsCart[i];
        this.total += element.item.price * element.quantity;
      }
    }
  }

  removeItem(index: number, id: number)
  {
    this.cartService.removeItem(id);
    this.itemsCart.splice(index, 1);
  }

  ngOnInit()
  {
  }

}
