import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html'
})
export class CheckoutComponent implements OnInit
{

  constructor() { }

  ngOnInit()
  {
    window.scrollTo(0, 0);
  }

}
