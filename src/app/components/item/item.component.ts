import { Component, OnInit, AfterViewInit, OnDestroy, OnChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { Item } from 'src/app/models/item.model';
import { ItemCart } from 'src/app/models/item-cart.model';
import { ItemService } from 'src/app/services/item.service';
import Swal from 'sweetalert2';
import { CurrencyPipe } from '@angular/common';
import { Title, Meta } from '@angular/platform-browser';
import { StoreNamePipe } from '../../pipes/store-name.pipe';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit, OnChanges
{
  item: Item;
  quantity: number = 1;
  otherItems: any[] = [];
  added: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private _cartService: ShoppingCartService,
    public _itemService: ItemService,
    public router: Router,
    private titleService: Title,
    private meta: Meta)
  {
    this.route.params.subscribe(params =>
    {
      this._itemService.getItem(params['id'])
        .subscribe((item) =>
        {
          this.item = item;
          console.log('b:::item: ' + JSON.stringify(item));

          this._itemService.getItemsRandomByStoreId(item._storeId, 6)
            .subscribe((documents) =>
            {
              this.otherItems = documents;
            });
            this.titleService.setTitle('' + this.item.name);
            this.meta.addTag({name: 'keywords', content: 'Camaleon.shop, Camaleon, Artículo, Producto, ' + this.item.keywords});
            this.meta.addTag({name: 'description', content: '' + this.item.description});
            this.meta.addTag({name: 'robots', content: 'all, follow'});
        });
    });
  }

  ngOnInit()
  {
    window.scrollTo(0, 0);
  }

  ngOnChanges()
  {
  }

  top()
  {
    window.scrollTo(0, 0);
  }

  addToCart()
  {

    let itemCart = new ItemCart(this.item, this.quantity);

    this._cartService.addToCart(itemCart);

    this.added = true;

    setTimeout(() => this.added = false, 1500);

    let qtyMessage = 'Agregado';

    if (this.quantity > 1)
    {
      qtyMessage += 's';
    }
    qtyMessage += ' a tu carrito!';
    Swal.fire(this.quantity + ' ' + this.item.name, qtyMessage, 'success');
  }
}
