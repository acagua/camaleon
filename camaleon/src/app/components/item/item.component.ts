import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CamaleonService } from 'src/app/services/camaleon.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html'
})
export class ItemComponent implements OnInit
{
  item: any = {};

  constructor(private route: ActivatedRoute, private camaleonService: CamaleonService)
  {
    this.route.params.subscribe(params =>
    {
      this.item = camaleonService.getItem(params['id']);
      console.log(this.item);
    });
  }

  ngOnInit()
  {
  }

}