import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/order.model';
import { OrderService } from 'src/app/services/order.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html'
})
export class OrderComponent implements OnInit
{

  //TODO: hacer el modelo de una orden?
  order: Order;

  constructor(private route: ActivatedRoute,
    public router: Router,
    public _orderService: OrderService,
    public _userService: UsuarioService) 
  {

    if (!this._userService.user)
    {
      this.router.navigate(['/home']);
    }
    else
    {
      this.route.params.subscribe(params =>
      {
        const orderId = params['id'];
        const userId = _userService.user._id;

        this._orderService.getOrder(orderId, userId)
          .subscribe((document) =>
          {
            this.order = document;
          });
      });
    }

  }


  ngOnInit()
  {
    window.scrollTo(0, 0);
  }

}
