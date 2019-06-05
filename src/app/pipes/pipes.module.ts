import { NgModule } from '@angular/core';
import { ImagePipe } from './image.pipe';
import { StoreNamePipe } from './store-name.pipe';
import { DateOrderPipe } from './date-order.pipe';
import { ShippingPipe } from './shipping.pipe';

@NgModule({
  declarations: [
    ImagePipe,
    StoreNamePipe,
    DateOrderPipe,
    ShippingPipe
  ],
  imports: [

  ],
  exports: [
    ImagePipe,
    StoreNamePipe,
    DateOrderPipe,
    ShippingPipe
  ]
})
export class PipesModule { }
