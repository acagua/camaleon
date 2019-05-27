import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Store } from 'src/app/models/store.model';
import { StoreService } from 'src/app/services/store.service';
import { ItemService } from 'src/app/services/item.service';
import { Item } from 'src/app/models/item.model';
import Swal from 'sweetalert2';
import { ItemCart } from 'src/app/models/item-cart.model';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html'
})
export class StoreComponent implements OnInit
{
  store: Store;
  items: Item[];
  numberItems: number;
  numberOfPages: number;
  actualPage: number = 1;
  from: number = 0;
  limit: number = 20;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public _storeService: StoreService,
    public _itemService: ItemService,
    public _cartService: ShoppingCartService
  )
  {
    this.route.params.subscribe(params =>
    {
      this._storeService.getStore(params['id'])
        .subscribe((store) =>
        {
          this.store = store;

          this.numberItems = this.store.numberOfItems;
          this.numberOfPages = Math.ceil(this.numberItems / 20);

          this.setItems();
        });
    });
  }


  setItems()
  {
    this._itemService.getItemsByStoreCodeName(this.store.codeName, this.from, this.limit)
      .subscribe((items) =>
      {
        this.items = items;
      });
  }


  counter(pNumber: number)
  {
    return new Array(pNumber);
  }


  goItem(item: Item)
  {
    this.router.navigate(['/item', item._id]);
  }


  addToCart(pItem: Item)
  {
    Swal.fire('Se ha añadido al carrito!', '', 'success');

    let itemCart = new ItemCart(pItem, 1);

    this._cartService.addToCart(itemCart);
  }


  ngOnInit()
  {
    window.scrollTo(0, 0);
  }


  goToPage(pNumberPage: number)
  {
    this.actualPage = pNumberPage;

    this.from = ((pNumberPage - 1) * 20);

    this.setItems();

    window.scrollTo(0, 0);
  }


  prevPage()
  {
    if (this.actualPage > 1)
    {
      this.actualPage--;

      this.from -= 20;

      this.setItems();

      window.scrollTo(0, 0);
    }
  }


  nextPage()
  {
    if (this.actualPage < this.numberOfPages)
    {
      this.actualPage++;

      this.from += 20;

      this.setItems();

      window.scrollTo(0, 320);
    }
  }

}
