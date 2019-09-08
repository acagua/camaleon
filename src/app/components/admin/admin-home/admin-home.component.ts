import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { StoreService } from 'src/app/services/store.service';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html'
})
export class AdminHomeComponent implements OnInit
{
  user: Usuario = null;

  constructor(
    public _userService: UsuarioService,
    public _storeService: StoreService
  )
  {
    this.user = _userService.user;

    if (this.user)
    {
      this._storeService.setPreferredStore(this.user);
    }
  }

  ngOnInit()
  {
  }

}
