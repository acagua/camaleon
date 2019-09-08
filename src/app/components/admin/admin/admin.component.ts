import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit
{
  constructor(
    public _userService: UsuarioService
  )
  {

  }


  ngOnInit()
  {
    window.scrollTo(0, 0);
  }

}
