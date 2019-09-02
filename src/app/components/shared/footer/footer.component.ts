import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.less']
})
export class FooterComponent implements OnInit
{

  storesLine1: any[] = [];

  constructor(public router: Router)
  {

  }

  ngOnInit()
  {

  }

}
