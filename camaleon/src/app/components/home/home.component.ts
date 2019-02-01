import { Component, OnInit } from '@angular/core';
import { CamaleonService } from 'src/app/services/camaleon.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit
{

  itemsLine1: any[] = [];
  itemsLine2: any[] = [];
  storesLine1: any[] = [];

  constructor(private router: Router, private camaleonService: CamaleonService)
  {
    this.itemsLine1 = this.camaleonService.getItemsLine1();
    this.itemsLine2 = this.camaleonService.getItemsLine2();
    this.storesLine1 = this.camaleonService.getStoresLine1();
  }

  ngOnInit()
  {
    window.scrollTo(0, 0);
  }

  goStore(store: any)
  {
    this.router.navigate(['/store', store.id]);
  }

  goItem(item: any)
  {
    this.router.navigate(['/item', item.id]);
  }

}
