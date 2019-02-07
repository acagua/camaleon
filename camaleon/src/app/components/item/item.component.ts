import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CamaleonService } from 'src/app/services/camaleon.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html'
})
export class ItemComponent implements OnInit
{
  item: any = {};
  quantity: number = 1;
  otherItems: any[] = [];
  added: boolean = false;


  constructor(private route: ActivatedRoute, private camaleonService: CamaleonService, private shoppingCartService: ShoppingCartService)
  {
    this.route.params.subscribe(params =>
    {
      // load the item
      this.item = camaleonService.getItem(params['id']);

      // load the other items
      this.otherItems = camaleonService.getOtherItems(this.item.idStore);

    });
  }

  addToCart()
  {

    let total = this.item.price * this.quantity;

    let itemCart = { item: this.item, quantity: this.quantity, total: total };

    this.shoppingCartService.addToCart(itemCart);

    this.added = true;

    setTimeout(() => this.added = false, 1500);
  }

  ngOnInit()
  {
    var urlParams = [];
    window.location.search.replace("?", "").split("&").forEach(function (e, i)
    {
      var p = e.split("=");
      urlParams[p[0]] = p[1];
    });

    if (urlParams["loaded"]) { } else
    {
      let win = (window as any);
      win.location.search = '?loaded=1';
    }
  }

}
