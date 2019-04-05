import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html'
})
export class ShoppingCartComponent implements OnInit {

  constructor(
    public router: Router,
    public _cartService: ShoppingCartService,
    public _userService: UsuarioService
  ) {

  }


  ngOnInit() {
  }


  goCheckout() {

    if (this._userService.user) {
      this.router.navigate(['/checkout']);
    }
    else {
      Swal.fire('', 'No estás registrado, ingresa para poder continuar :D', 'warning');

      Swal.fire({
        title: 'Oops',
        text: 'No estás registrado, ingresa para poder continuar :D',
        type: 'warning',
        confirmButtonText: 'Ok'
      }).then((result) => {
        if (result.value) {
          this.router.navigate(['/login']);
        }
      });


    }
  }

}
