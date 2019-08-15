import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html'
})
export class AdminHomeComponent implements OnInit
{

  constructor(
    public _userService: UsuarioService
  )
  {

  }

  ngOnInit()
  {
  }

}
