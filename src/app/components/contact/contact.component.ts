import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styles: []
})
/*export class ContactComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}*/

export class ContactComponent implements OnInit
{
  constructor(private router: Router)
  {

  }

  ngOnInit()
  {
    window.scrollTo(0,0);
  }

  goStore(store: any)
  {
    this.router.navigate(['/store', store.id]);
  }

  goItem(item: any)
  {
    this.router.navigate(['/item', item._id]);
  }

}
