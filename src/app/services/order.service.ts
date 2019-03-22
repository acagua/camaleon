import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../config/config';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderService
{

  constructor(public httpClient: HttpClient, public router: Router) { }


  registerOrder(pOrder: any)
  {
    let url = URL_SERVICIOS + '/order';

    return this.httpClient.post(url, pOrder).pipe(map((resp: any) =>
    {
      Swal.fire('Orden registrada!', 'orden #' + resp.document.orderNumber + ' ha sido registrada', 'success');
      return resp;
    }));
  }


  getOrder(pOrderId: String)
  {
    let url = URL_SERVICIOS + '/order/' + pOrderId;

    return this.httpClient.get(url).pipe(map((resp: any) =>
    {
      return resp.document;
    }));
  }


  getOrdersByUser(pUserId: String)
  {
    let url = URL_SERVICIOS + '/order/user/' + pUserId;

    return this.httpClient.get(url).pipe(map((resp: any) =>
    {
      return resp.documents;
    }));
  }





}
