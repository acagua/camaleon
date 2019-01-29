import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CamaleonService } from 'src/app/services/camaleon.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html'
})
export class StoreComponent implements OnInit
{
  store: any = {};

  constructor(private route: ActivatedRoute, private camaleonService: CamaleonService)
  {
    this.route.params.subscribe(params =>
    {
      console.log(params['id']);
      console.log(this.store.name);
      this.store = camaleonService.getStore(params['id']);
    });
  }

  ngOnInit()
  {
  }

}
