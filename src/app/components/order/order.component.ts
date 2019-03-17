import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/order.model';
import { OrderService } from 'src/app/services/order.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html'
})
export class OrderComponent implements OnInit
{

  //TODO: hacer el modelo de una orden?
  order: Order;

  constructor(private route: ActivatedRoute,
    public _orderService: OrderService) 
  {
    this.route.params.subscribe(params =>
    {
      this._orderService.getOrder(params['id'])
        .subscribe((document) =>
        {
          this.order = document;
        });
    });
  }


  ngOnInit()
  {
    window.scrollTo(0, 0);
  }

}
