import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit
{

  shippingCost: number = 0;

  constructor(
    public router: Router,
    public _cartService: ShoppingCartService,
    public _userService: UsuarioService,
    private titleService: Title,
    private meta: Meta)
  {

  }


  ngOnInit()
  {
    this.titleService.setTitle('Carrito de Compras');
    this.meta.addTag({name: 'keywords', content: 'Camaleon.shop, Camaleon, Carrito, Cart'});
    this.meta.addTag({name: 'description', content: 'Revisa los artículos que vas a comprar'});
    this.meta.addTag({name: 'robots', content: 'all, follow'});

    window.scrollTo(0, 0);
  }


  goCheckout()
  {

    if (this._userService.user)
    {
      this.router.navigate(['/checkout']);
    }
    else
    {
      Swal.fire('', 'No estás registrado, ingresa para poder continuar :D', 'warning');

      Swal.fire({
        title: 'Oops',
        text: 'Ingresa o registrate para continuar :D',
        type: 'warning',
        confirmButtonText: 'Ok'
      }).then((result) =>
      {
        if (result.value)
        {
          localStorage.setItem('pendingCheckout', 'yes');
          this.router.navigate(['/login']);
        }
      });

    }
  }

}
