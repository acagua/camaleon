import { NgModule } from '@angular/core';
import { ImagePipe } from './image.pipe';
import { StoreNamePipe } from './store-name.pipe';
import { DateOrderPipe } from './date-order.pipe';

@NgModule({
  declarations: [
    ImagePipe,
    StoreNamePipe,
    DateOrderPipe
  ],
  imports: [

  ],
  exports: [
    ImagePipe,
    StoreNamePipe,
    DateOrderPipe
  ]
})
export class PipesModule { }
