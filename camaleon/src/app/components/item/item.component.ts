import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CamaleonService } from 'src/app/services/camaleon.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html'
})
export class ItemComponent implements OnInit, AfterViewInit
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

  addToCart()
  {

  }

  ngOnInit()
  {
    var urlParams = [];
    window.location.search.replace("?", "").split("&").forEach(function (e, i) {
        var p = e.split("=");
        urlParams[p[0]] = p[1];
    });

    // We have all the params now -> you can access it by name
    console.log(urlParams["loaded"]);

    if(urlParams["loaded"]) {}else{

        let win = (window as any);
        win.location.search = '?loaded=1';
        //win.location.reload('?loaded=1');
    }

    //window.location.reload();
    //window.scrollTo(0, 0);
  }

  ngAfterViewInit(): void
  {

  }

}
