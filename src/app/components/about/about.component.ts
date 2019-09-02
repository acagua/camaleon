import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit
{

  constructor(private titleService: Title,
    private meta: Meta) { }

  ngOnInit()
  {
    this.titleService.setTitle('Nosotros');
    this.meta.addTag({name: 'keywords', content: 'Camaleon.shop, Camaleon, Nosotros, Quienes somos'});
    this.meta.addTag({name: 'description', content: 'Conoce el equipo detrás de Camaleon, trabajando cada día para llevarte productos novedosos'});
    this.meta.addTag({name: 'robots', content: 'all, follow'});
  }

}
