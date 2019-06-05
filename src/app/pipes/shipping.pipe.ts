import { Pipe, PipeTransform } from '@angular/core';
import { Item } from '../models/item.model';
import { City } from '../models/city.model';

@Pipe({
  name: 'shipping'
})
export class ShippingPipe implements PipeTransform
{

  transform(item: Item): String
  {
    if (item.shippingAllColombia)
    {
      return 'Todo el país';
    }
    else
    {
      return this.getCitiesBeautify(item.shippingCities || []);
    }
  }

  getCitiesBeautify(cities: City[]): String
  {
    try
    {
      let resp = '';

      cities.forEach(element =>
      {
        resp += element.name + ', ';
      });

      resp = resp.substring(0, resp.length - 2);

      return resp;
    }
    catch (error)
    {
      return 'NA';
    }
  }

}
