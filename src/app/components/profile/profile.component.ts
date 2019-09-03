import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/models/usuario.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { OrderService } from 'src/app/services/order.service';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.less']
})
export class ProfileComponent implements OnInit
{
  //--------------------------------------------------ATTRIBUTES
  user: Usuario;
  forma: FormGroup;
  orders: any[];

  //--------------------------------------------------METHODS
  constructor(
    public _userService: UsuarioService,
    public _orderService: OrderService,
    private titleService: Title,
    private meta: Meta)
  {
    this.user = this._userService.user;
  }


  ngOnInit()
  {
    this.titleService.setTitle('Mi Cuenta');
    this.meta.addTag({name: 'keywords', content: 'Camaleon.shop, Camaleon, Mi cuenta, Perfil'});
    this.meta.addTag({name: 'description', content: 'Ver detalles de mi cuenta'});
    this.meta.addTag({name: 'robots', content: 'all, follow'});
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
        console.log(resp.document);
      });
  }

}
