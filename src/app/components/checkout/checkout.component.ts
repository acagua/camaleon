import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { OrderService } from 'src/app/services/order.service';
import { Router } from '@angular/router';
import { GeoService } from 'src/app/services/geo.service';
import { Department } from 'src/app/models/department.model';
import { City } from 'src/app/models/city.model';
import { ItemCart } from 'src/app/models/item-cart.model';
import Swal from 'sweetalert2';
import { Item } from 'src/app/models/item.model';
import { Md5 } from 'ts-md5/dist/md5';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html'
})
export class CheckoutComponent implements OnInit
{
  // TODO: como se puede hacer esto trayendo de base de datos solo una vez? habrá algun tipo de "bean de aplicacion, de sesion"?
  arrPaymentMethod: any[] = [{ '_id': 1, 'name': 'Contraentrega' }, { '_id': 2, 'name': 'Transferencia' }];
  departments: Department[] = [{ name: 'BOGOTA', code: '01' }];
  cities: City[] = [];
  shippingCost: number = 6000;
  total: number = 0;
  forma: FormGroup;
  canShip: Boolean = true;
  payuSignature: String;

  constructor(
    public _userService: UsuarioService,
    public _cartService: ShoppingCartService,
    public _orderService: OrderService,
    public _geoService: GeoService,
    public router: Router,
  )
  {
    this.total = _cartService.total + this.shippingCost;

    this.forma = new FormGroup({
      telephone: new FormControl(this._userService.user.telephone || null, Validators.required),
      address: new FormControl(this._userService.user.address || null, Validators.required),
      whoReceives: new FormControl(this._userService.user.name + ' ' + this._userService.user.lastName || null, Validators.required),
      department: new FormControl('11', Validators.required),
      city: new FormControl(null, Validators.required),
      paymentMethod: new FormControl(1, Validators.required),
      comments: new FormControl()
    });
  }

  ngOnInit()
  {
    window.scrollTo(0, 0);

    this._geoService.getDepartments().subscribe(docs =>
    {
      this.departments = docs;

      this.selectDepartment('11');

      // this.forma.controls['city'].setValue('001'); // TODO: pendiente de borrar, junio 4 de 2019
    });
  }

  onRegisterOrder()
  {
    //check if the order has shipping issues

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
      // this._cartService.removeCart();
      // this.router.navigate(['/profile']);
    });
  }

  selectDepartment(selectedOption: String)
  {
    this._geoService.getCitiesFromDepartment(selectedOption).subscribe(docs =>
    {
      this.cities = docs;
    });
  }

  selectCity(selectedOption: String)
  {
    const citySelected = selectedOption;

    let arrDifferentCities: City[] = [];
    let arrItemsNoShip: String[] = [];

    //check if the order has shipping issues
    this._cartService.arrItemCart.forEach((element: ItemCart) =>
    {
      const shippingAllColombia = element.item.shippingAllColombia;

      if (!shippingAllColombia)
      {
        const item: Item = element.item;

        item.shippingCities.forEach((element2: City) =>
        {
          if (citySelected !== element2.cityDepartmentCode)
          {
            arrDifferentCities.push(element2);
            arrItemsNoShip.push(item.name);
            this.canShip = false;
          }
        });
      }
    });

    if (!this.canShip)
    {
      Swal.fire('Oops', 'Los siguientes items no pueden ser enviados a tu ciudad: \n ' + JSON.stringify(arrItemsNoShip), 'warning');
    }
  }

  setPayuSignature(referenceCode: string, amount: number)
  {
    const apiKey = 'riJ8844MMP9ursOtgmFWnhSI2B';
    const merchantId = '806840';
    const currency = 'COP';
    this.payuSignature = Md5.hashStr(apiKey + '~' + merchantId + '~' + referenceCode + '~' + amount + '~' + currency).toString();

    console.log(this.payuSignature);
  }


}
