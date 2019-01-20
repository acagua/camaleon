import { Component, OnInit } from '@angular/core';
import { CamaleonService } from 'src/app/services/camaleon.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  itemsLine1: any[] = [];
  itemsLine2: any[] = [];
  storesLine1: any[] = [];

  constructor(private camaleonService: CamaleonService) {
    this.itemsLine1 = this.camaleonService.getItemsLine1();
    this.itemsLine2 = this.camaleonService.getItemsLine2();
    this.storesLine1 = this.camaleonService.getStoresLine1();
  }

  ngOnInit() {
  }

}
