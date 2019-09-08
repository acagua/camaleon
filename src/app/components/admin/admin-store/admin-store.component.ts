import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import { StoreService } from 'src/app/services/store.service';
import { Store } from 'src/app/models/store.model';
import { Usuario } from 'src/app/models/usuario.model';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/app/models/category.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-store',
  templateUrl: './admin-store.component.html'
})
export class AdminStoreComponent implements OnInit
{
  store: Store;
  updating: boolean = false;
  creating: boolean = false;
  formStore: FormGroup;
  user: Usuario = null;
  categories: Category[] = [];
  showImage: boolean = true;


  constructor(
    public _userService: UsuarioService,
    public _storeService: StoreService,
    public _categoryService: CategoryService
  ) 
  {
    this.user = this._userService.user;
    var isUser = false;

    if (this.user)
    {
      if (this.user.access.length > 0)
      {
        var preferredStoreId = this._storeService.getPreferredStore(this.user.access);

        if (preferredStoreId)
        {
          this._storeService.getStore(preferredStoreId)
            .subscribe(resp =>
            {
              this.store = resp;

              this.formStore = new FormGroup({
                name: new FormControl(this.store ? this.store.name : null),
                description: new FormControl(this.store ? this.store.description : null),
                category: new FormControl(this.store ? this.store._categoryId : null),
                email: new FormControl(this.store ? this.store.emails[0] : null),
                image: new FormControl(this.store ? this.store.imageLogo : null)
                // image: new FormControl(null, [Validators.required, requiredFileType('png')])
              });

              this._storeService.quitStore();

              this.updating = true;
              this.creating = false;
            });
        }

        isUser = true;
      }
      else
      {
        isUser = false;
      }
    }
    else
    {
      isUser = false;
    }

    if (!isUser)
    {
      this.store = this._storeService.store;
    }

    if (this.store)
    {
      this.updating = true;
      this.creating = false;
    }
    else
    {
      this.updating = false;
      this.creating = true;
    }

    this._categoryService.getCategories().subscribe(resp =>
    {
      this.categories = resp;
    });

    console.log('actualizando ' + this.updating);
    console.log('creating ' + this.creating);
  }


  ngOnInit()
  {
    window.scrollTo(0, 0);

    this.formStore = new FormGroup({
      name: new FormControl(this.store ? this.store.name : null),
      description: new FormControl(this.store ? this.store.description : null),
      category: new FormControl(this.store ? this.store._categoryId : null),
      email: new FormControl(this.store ? this.store.emails[0] : null),
      image: new FormControl(this.store ? this.store.imageLogo : null)
      // image: new FormControl(null, [Validators.required, requiredFileType('png')])
    });

  }


  processImageUpdate(mensaje)
  {
    this.showImage = false;
    console.log(mensaje);
  }


  onSaveChanges()
  {
    const formStoreValue = this.formStore.value;

    // const email = formStoreValue.email.trim().toLowerCase();

    // if (REGEX_EMAIL.test(String(email)))
    if (true)
    {
      var formData = new FormData();

      for (const key of Object.keys(formStoreValue))
      {
        var value = formStoreValue[key];
        formData.append(key, value);
      }

      //add the user to send to backend
      if (this.updating)
      {
        console.log('formStoreValue', formStoreValue);

        formData.append('storeId', this.store._id);

        this._storeService.updateStore(this.store._id, formData)
          .subscribe(resp =>
          {
            Swal.fire('Tienda Actualizada!', 'Tu tienda se ha modificado con éxito :D', 'success');
            this.store = resp.document;
          });
      }
      else if (this.creating)
      {
        formData.append('userId', this.user._id);

        this._storeService.saveStore2(formData)
          .subscribe(resp =>
          {
            this.store = resp.document;
            this._userService.addUserAccess({ storeId: this.store._id, preferred: true, role: "Administrador" });
            this.creating = false;
            this.updating = true;
          });
      }
    }
    else
    {
      Swal.fire('Oops', 'El correo no parece un correo e_e. Recuerda que debe tener un patrón como micorreo@dominio.com', 'warning');
    }
  }


}
