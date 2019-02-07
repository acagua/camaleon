import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService
{
  items: any[] = [];

  constructor()
  {
    if (localStorage.getItem('cart'))
    {
      this.items = JSON.parse(localStorage.getItem('cart'));
    }
  }

  addToCart(itemCart: any)
  {
    let agregar: boolean = true;

    if (localStorage.getItem('cart'))
    {
      this.items = JSON.parse(localStorage.getItem('cart'));

      for (let i = 0; i < this.items.length; i++)
      {
        const element = this.items[i];

        if (element.item.id === itemCart.item.id)
        {
          this.items[i].quantity = this.items[i].quantity + itemCart.quantity;
          agregar = false;
        }
      }
    }

    if (agregar)
    {
      this.items.push(itemCart);
    }
    localStorage.setItem('cart', JSON.stringify(this.items));
  }

  removeItem(id: number)
  {
    if (localStorage.getItem('cart'))
    {
      this.items = JSON.parse(localStorage.getItem('cart'));
    }

    this.items = this.items.filter((dataItemCart) => dataItemCart.item.id !== id);



    localStorage.setItem('cart', JSON.stringify(this.items));
  }
}
