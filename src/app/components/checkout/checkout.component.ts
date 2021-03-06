import { Component, OnInit, ViewChild } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OrderService } from 'src/app/services/order.service';
import { Router } from '@angular/router';
import { GeoService } from 'src/app/services/geo.service';
import { Department } from 'src/app/models/department.model';
import { City } from 'src/app/models/city.model';
import { ItemCart } from 'src/app/models/item-cart.model';
import Swal from 'sweetalert2';
import { Item } from 'src/app/models/item.model';
import { Md5 } from 'ts-md5/dist/md5';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.less']
})

export class CheckoutComponent implements OnInit
{
  // TODO: como se puede hacer esto trayendo de base de datos solo una vez? habrá algun tipo de "bean de aplicacion, de sesion"?
  arrPaymentMethod: any[] = [{ '_id': 1, 'name': 'Tarjeta de Crédito' }, { '_id': 2, 'name': 'PSE' }, { '_id': 3, 'name': 'Tarjeta Débito' }, { '_id': 4, 'name': 'Pago en Efectivo' }, { '_id': 5, 'name': 'Pago en Bancos'}];
  departments: Department[] = [];
  cities: City[] = [];
  subtotal: number = 0;
  shippingCost: number = 8000;//TODO dejarlo configurable desde BD
  total: number = 0;
  forma: FormGroup;
  formPayu: FormGroup;
  canShip: Boolean = true;
  payuSignature: String;
  email: String;
  tax = 0;
  taxReturnBase = 0;
  // Produccion
  url = 'https://checkout.payulatam.com/ppp-web-gateway-payu/';
  payUApiKey = 'riJ8844MMP9ursOtgmFWnhSI2B';
  merchantId = '806840';
  accountId = '813893';
  responseUrl = 'https://www.camaleon.shop/response';
  confirmationUrl = 'https://www.camaleon.shop/api/payu';

  // Sandbox
  // url = 'https://sandbox.checkout.payulatam.com/ppp-web-gateway-payu';
  // payUApiKey = '4Vj8eK4rloUd272L48hsrarnUA';
  // merchantId = '508029';
  // accountId = '512326';
  // // responseUrl = 'http://localhost:4200/response';
  // responseUrl = 'https://www.camaleon.shop/response';
  // confirmationUrl = 'https://www.camaleon.shop/api/payu';

  currency = 'COP';

  description: string;
  referenceCode: string;

  constructor(
    public _userService: UsuarioService,
    public _cartService: ShoppingCartService,
    public _orderService: OrderService,
    public _geoService: GeoService,
    public router: Router,
    private titleService: Title,
    private meta: Meta)
  {
    this.subtotal = _cartService.total;
    this.total = _cartService.total + this.shippingCost;
    this.email = this._userService.user.email;
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

    this.titleService.setTitle('Finalizar Compra');
    this.meta.addTag({name: 'keywords', content: 'Camaleon.shop, Camaleon, Finalizar compra, Checkout'});
    this.meta.addTag({name: 'description', content: 'Finaliza tu compra'});
    this.meta.addTag({name: 'robots', content: 'all, follow'});

    window.scrollTo(0, 0);

    this._geoService.getDepartments()
      .subscribe(docs =>
      {
        this.departments = docs;
        this.selectDepartment('11');
      });
  }

  onRegisterOrder()
  {
    // check if the order has shipping issues
    const formValues = this.forma.value;

    this._orderService.registerOrder({
      telephone: formValues.telephone,
      address: formValues.address,
      whoReceives: formValues.whoReceives,
      paymentMethod: formValues.paymentMethod,
      comments: formValues.comments,
      subtotal: this.subtotal,
      shippingCost: this.shippingCost,
      total: this.total,
      userId: this._userService.user._id,
      userEmail: this._userService.user.email,
      arrItem: this._cartService.arrItemCart,
      department: this.getDepartment(formValues.department),
      city: this.getCity(formValues.city)
    }).subscribe(resp =>
    {
      this.referenceCode = resp.document.number;
      this.description = resp.document.number;

      // this.router.navigate(['/profile']);
      this.setPayuSignature();
      this._cartService.removeCart();
      this.submitForm();
    });
  }

  getDepartment(pCode: String)
  {
    for (let i = 0; i < this.departments.length; i++)
    {
      const element = this.departments[i];

      if (element.code === pCode)
      {
        return element;
      }
    }
  }

  getCity(pCode: String)
  {
    for (let i = 0; i < this.cities.length; i++)
    {
      const element = this.cities[i];

      if (element.cityDepartmentCode === pCode)
      {
        return element;
      }
    }
  }

  selectDepartment(selectedOption: String)
  {
    this._geoService.getCitiesFromDepartment(selectedOption).subscribe(docs =>
    {
      this.cities = docs;
      // console.log("Ciudades:");
      // console.log(this.cities);
      // console.log("1Ciudad:");
      // console.log(this.cities[0].cityDepartmentCode);
      // console.log("fin");
      this.selectCity(this.cities[0].cityDepartmentCode);
      this.forma.value.city = this.cities[0].cityDepartmentCode;
    });
  }

  selectCity(selectedOption: String)
  {
    console.log("select city");
    console.log(selectedOption);
      
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
        if (item.shippingCities != null)
        {

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
      }
    });

    if (!this.canShip)
    {
      Swal.fire('Oops', 'Los siguientes items no pueden ser enviados a tu ciudad: \n ' + JSON.stringify(arrItemsNoShip), 'warning');
    }
  }

  setPayuSignature()
  {
    this.payuSignature = Md5.hashStr(this.payUApiKey + '~' + this.merchantId + '~' + this.referenceCode + '~' + this.total + '~' + this.currency).toString();
  }

  submitForm()
  {
    const customForm = document.createElement('form');
    customForm.action = this.url;
    customForm.method = 'POST';

    const merchantId = document.createElement('input');
    merchantId.type = 'hidden';
    merchantId.name = 'merchantId';
    merchantId.value = this.merchantId;
    customForm.appendChild(merchantId);

    const accountId = document.createElement('input');
    accountId.type = 'hidden';
    accountId.name = 'accountId';
    accountId.value = this.accountId;
    customForm.appendChild(accountId);

    const description = document.createElement('input');
    description.type = 'hidden';
    description.name = 'description';
    description.value = this.description;
    customForm.appendChild(description);

    const referenceCode = document.createElement('input');
    referenceCode.type = 'hidden';
    referenceCode.name = 'referenceCode';
    referenceCode.value = this.referenceCode;
    customForm.appendChild(referenceCode);

    const amount = document.createElement('input');
    amount.type = 'hidden';
    amount.name = 'amount';
    amount.value = this.total.toString();
    customForm.appendChild(amount);

    const tax = document.createElement('input');
    tax.type = 'hidden';
    tax.name = 'tax';
    tax.value = this.tax.toString();
    customForm.appendChild(tax);

    const taxReturnBase = document.createElement('input');
    taxReturnBase.type = 'hidden';
    taxReturnBase.name = 'taxReturnBase';
    taxReturnBase.value = this.taxReturnBase.toString();
    customForm.appendChild(taxReturnBase);

    const currency = document.createElement('input');
    currency.type = 'hidden';
    currency.name = 'currency';
    currency.value = this.currency;
    customForm.appendChild(currency);

    const test = document.createElement('input');
    test.type = 'hidden';
    test.name = 'test';
    test.value = '0';
    customForm.appendChild(test);

    const signature = document.createElement('input');
    signature.type = 'hidden';
    signature.name = 'signature';
    signature.value = this.payuSignature.toString();
    customForm.appendChild(signature);

    const buyerEmail = document.createElement('input');
    buyerEmail.type = 'hidden';
    buyerEmail.name = 'buyerEmail';
    buyerEmail.value = this.email.toString();
    customForm.appendChild(buyerEmail);

    const responseUrl = document.createElement('input');
    responseUrl.type = 'hidden';
    responseUrl.name = 'responseUrl';
    responseUrl.value = this.responseUrl;
    customForm.appendChild(responseUrl);

    const confirmationUrl = document.createElement('input');
    confirmationUrl.type = 'hidden';
    confirmationUrl.name = 'confirmationUrl';
    confirmationUrl.value = this.confirmationUrl;
    customForm.appendChild(confirmationUrl);

    document.body.appendChild(customForm);
    customForm.submit();
  }

}
