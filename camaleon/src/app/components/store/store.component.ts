import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Store } from 'src/app/models/store.model';
import { StoreService } from 'src/app/services/store.service';
import { ItemService } from 'src/app/services/item.service';
import { Item } from 'src/app/models/item.model';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html'
})
export class StoreComponent implements OnInit
{
  store: Store;
  items: Item[];

  constructor(
    private route: ActivatedRoute, private router: Router,
    public _storeService: StoreService,
    public _istemService: ItemService
  )
  {
    this.route.params.subscribe(params =>
    {
      this._storeService.getStore(params['id'])
        .subscribe((store) =>
        {
          this.store = store;
        });

      this._istemService.getItemsByStore(params['id'])
        .subscribe((items) =>
        {
          this.items = items;
        });
    });
  }

  goItem(item: Item)
  {
    console.log(item);
    this.router.navigate(['/item', item._id]);
  }

  ngOnInit()
  {
    window.scrollTo(0, 0);
  }

}
