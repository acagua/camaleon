import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform
{

  transform(image: string): any
  {
    return 'FUNCIONA';
  }

}
