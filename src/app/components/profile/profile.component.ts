import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/models/usuario.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit
{
  //--------------------------------------------------ATTRIBUTES
  user: Usuario;
  forma: FormGroup;
  orders: any[];

  //--------------------------------------------------METHODS
  constructor(public _userService: UsuarioService,
    public _orderService: OrderService)
  {
    this.user = this._userService.user;
  }


  ngOnInit()
  {
    this.forma = new FormGroup({
      name: new FormControl(this.user.name, Validators.required),
      lastName: new FormControl(null, Validators.required),
      email: new FormControl({ value: this.user.email, disabled: true }, [Validators.required, Validators.email]),
      address: new FormControl(this.user.address),
      telephone: new FormControl(this.user.telephone),
    });

    if (this.user)
    {
      this._orderService.getOrdersByUser(this.user._id)
        .subscribe((orders) =>
        {
          this.orders = orders;
        });
    }
  }


  onSaveChanges()
  {
    const formaValue = this.forma.value;

    let usuario = new Usuario(formaValue.name, formaValue.lastName, formaValue.email, null, formaValue.telephone, formaValue.address, null, this.user._id);

    this._userService.updateUser(usuario)
      .subscribe(resp =>
      {
        console.log(resp);
      });;

  }

}
