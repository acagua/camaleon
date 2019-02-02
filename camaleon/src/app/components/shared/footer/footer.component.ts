import { Component, OnInit } from '@angular/core';
import { CamaleonService } from 'src/app/services/camaleon.service';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html'
})
export class FooterComponent implements OnInit {

  storesLine1: any[] = [];
  
  constructor(private camaleonService: CamaleonService)
  {
    this.storesLine1 = this.camaleonService.getStoresLine1();
  }
  
  ngOnInit() {
  }

}
