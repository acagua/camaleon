import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { Item } from 'src/app/models/item.model';
import { ItemCart } from 'src/app/models/item-cart.model';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html'
})
export class ItemComponent implements OnInit
{
  item: Item;
  quantity: number = 1;
  otherItems: any[] = [];
  added: boolean = false;

  constructor(private route: ActivatedRoute,
    private _cartService: ShoppingCartService,
    public _itemService: ItemService)
  {
    this.route.params.subscribe(params =>
    {
      this._itemService.getItem(params['id'])
        .subscribe((item) =>
        {
          console.log(item);
          this.item = item;
        });
    });
  }


  ngOnInit()
  {
    window.scrollTo(0, 0);
  }


  addToCart()
  {

    let itemCart = new ItemCart(this.item, this.quantity);

    this._cartService.addToCart(itemCart);

    this.added = true;

    setTimeout(() => this.added = false, 1500);
  }




}
