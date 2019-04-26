import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'storeName'
})
export class StoreNamePipe implements PipeTransform
{

  transform(value: String): String
  {
    return value.split('-').join(' ');
  }

}
