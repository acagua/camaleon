import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateOrder'
})
export class DateOrderPipe implements PipeTransform
{

  transform(value: any): string 
  {
    try
    {
      let day = '';
      let month = '';
      let year = '';
      let hour = '';
      let minutes = '';

      var date = value.split('T')[0];
      var time = value.split('T')[1];

      var arrValuesDate = date.split('-');
      var arrValuesTime = time.split(':');

      // 2019-03-17T23:19:59.884Z

      day = arrValuesDate[2];
      month = this.getMonth(arrValuesDate[1]);
      year = arrValuesDate[0]
      hour = arrValuesTime[0];
      minutes = arrValuesTime[1];

      return day + ' de ' + month + ' del ' + year + ' a las ' + hour + ':' + minutes;
    }
    catch (error)
    {
      console.log('error in dateOrder pipe: ' + error);
      return 'NA';
    }
  }


  getMonth(monthNumber: string): string
  {
    try
    {
      let monthString = '';

      switch (monthNumber)
      {
        case '01': monthString = "Enero";
          break;
        case '02': monthString = "Febrero";
          break;
        case '03': monthString = "Marzo";
          break;
        case '04': monthString = "Abril";
          break;
        case '05': monthString = "Mayo";
          break;
        case '06': monthString = "Junio";
          break;
        case '07': monthString = "Julio";
          break;
        case '08': monthString = "Agoto";
          break;
        case '09': monthString = "Septiembre";
          break;
        case '10': monthString = "Octubre";
          break;
        case '11': monthString = "Noviembre";
          break;
        case '12': monthString = "Diciembre";
          break;
      }

      return monthString;
    }
    catch (error)
    {
      console.log('error in dateOrder pipe: ' + error);
      return 'NA';
    }
  }

}
