import { Injectable, OnDestroy } from '@angular/core';
import { ItemCart } from '../models/item-cart.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService
{

  arrItemCart: ItemCart[] = [];
  quantity: number = 0;
  total: number = 0;


  constructor()
  {
    const cart = localStorage.getItem('arrItemCart');

    if (cart)
    {
      this.arrItemCart = JSON.parse(cart);
      this.quantity = JSON.parse(localStorage.getItem('quantity')) || 0;
      this.total = JSON.parse(localStorage.getItem('total')) || 0;
    }
  }


  addToCart(pItemCart: ItemCart)
  {
    this.quantity += pItemCart.quantity;
    this.total += pItemCart.total;

    let agregar: boolean = true;
    const cart = localStorage.getItem('arrItemCart');

    if (cart)
    {
      this.arrItemCart = JSON.parse(cart);

      for (let i = 0; i < this.arrItemCart.length; i++)
      {
        const itemCart = this.arrItemCart[i];

        if (itemCart.item._id === pItemCart.item._id)
        {
          this.arrItemCart[i].quantity = itemCart.quantity + pItemCart.quantity;
          this.arrItemCart[i].total = itemCart.total + pItemCart.total;
          agregar = false;
        }
      }
    }

    if (agregar)
    {
      this.arrItemCart.push(pItemCart);
    }

    this.saveStorage();
  }


  removeItem(pItemCart: ItemCart)
  {
    this.arrItemCart = this.arrItemCart.filter((dataItemCart) => dataItemCart.item._id !== pItemCart.item._id);
    this.quantity -= pItemCart.quantity;
    this.total -= pItemCart.total;

    this.saveStorage();
  }


  saveStorage()
  {
    localStorage.setItem('arrItemCart', JSON.stringify(this.arrItemCart));
    localStorage.setItem('quantity', JSON.stringify(this.quantity));
    localStorage.setItem('total', JSON.stringify(this.total));
  }



}
