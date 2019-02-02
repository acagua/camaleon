import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  goStore(store: any)
  {
    this.router.navigate(['/store', store.id]);
  }

  goAbout()
  {
    this.router.navigate(['/about']);
  }

  goContact()
  {
    this.router.navigate(['/contact']);
  }


}
