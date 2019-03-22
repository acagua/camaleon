import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { StoreService } from 'src/app/services/store.service';
import { Store } from 'src/app/models/store.model';
import { Item } from 'src/app/models/item.model';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit
{

  itemsLine1: Item[] = [];
  itemsLine2: Item[] = [];
  storesLine1: Store[] = [];

  @Input()
  dataSlideTo: string;

  constructor(private router: Router,
    public _storeService: StoreService,
    public _itemService: ItemService)
  {
    this._itemService.getItems(0, 8)
      .subscribe((items) =>
      {
        this.itemsLine1 = items.slice(0, 4);
        this.itemsLine2 = items.slice(4, 8);
      });

    this._storeService.getStores()
      .subscribe((stores) =>
      {
        this.storesLine1 = stores;
      });

  }

  ngOnInit()
  {
    window.scrollTo(0, 0);
  }

  goStore(store: Store)
  {
    this.router.navigate(['/store', store.codeName]);
  }

}
