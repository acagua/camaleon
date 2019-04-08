import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { OrderService } from 'src/app/services/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html'
})
export class CheckoutComponent implements OnInit
{
  //TODO: como se puede hacer esto trayendo de base de datos solo una vez? habrá algun tipo de "bean de aplicacion, de sesion"?
  arrPaymentMethod: any[] = [{ '_id': 1, 'name': 'Contraentrega' }, { '_id': 2, 'name': 'Transferencia' }];

  shippingCost: number = 6000;

  total: number = 0;

  forma: FormGroup;


  constructor(
    public _userService: UsuarioService,
    public _cartService: ShoppingCartService,
    public _orderService: OrderService,
    public router: Router
  )
  {
    this.total = _cartService.total + this.shippingCost;

    this.forma = new FormGroup({
      telephone: new FormControl(this._userService.user.telephone || null, Validators.required),
      address: new FormControl(this._userService.user.address || null, Validators.required),
      whoReceives: new FormControl(this._userService.user.name + ' ' + this._userService.user.lastName || null, Validators.required),
      paymentMethod: new FormControl(1, Validators.required),
      comments: new FormControl()
    });
  }


  ngOnInit()
  {
    window.scrollTo(0, 0);
  }


  onRegisterOrder()
  {
    console.warn(this.forma.value);

    const formValues = this.forma.value;

    this._orderService.registerOrder({
      telephone: formValues.telephone,
      address: formValues.address,
      whoReceives: formValues.whoReceives,
      paymentMethod: formValues.paymentMethod,
      comments: formValues.comments,
      shippingCost: this.shippingCost,
      total: this.total,
      userId: this._userService.user._id,
      userEmail: this._userService.user.email,
      arrItem: this._cartService.arrItemCart
    }).subscribe(resp =>
    {
      this._cartService.removeCart();
      this.router.navigate(['/profile']);
    });;

  }
}
