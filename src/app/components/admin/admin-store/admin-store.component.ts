import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import { StoreService } from 'src/app/services/store.service';
import { Store } from 'src/app/models/store.model';
import { Usuario } from 'src/app/models/usuario.model';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/app/models/category.model';

@Component({
  selector: 'app-store',
  templateUrl: './admin-store.component.html'
})
export class AdminStoreComponent implements OnInit
{
  public imagePath;
  imageURL: any;
  public message: string;
  formStore: FormGroup;
  user: Usuario = null;
  categories: Category[] = [];

  constructor(
    public _userService: UsuarioService,
    public _storeService: StoreService,
    public _categoryService: CategoryService
  ) 
  {
    this.user = this._userService.user;

    this._categoryService.getCategories()
      .subscribe((documents) =>
      {
        this.categories = documents;

        console.log(this.categories);
      });
  }


  ngOnInit()
  {
    this.formStore = new FormGroup({
      name: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      category: new FormControl(null, Validators.required)
    });

    window.scrollTo(0, 0);
  }


  preview(files)
  {
    if (files.length === 0)
    {
      return;
    }

    var mimeType = files[0].type;

    if (mimeType.match(/image\/*/) == null)
    {
      this.message = "Only images are supported.";
      return;
    }

    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) =>
    {
      this.imageURL = reader.result;
    }
  }


  onSaveChanges()
  {
    const formStoreValue = this.formStore.value;

    let store = new Store(formStoreValue.name, formStoreValue.description, 'PENDIENTE');

    this._storeService.saveStore(store)
      .subscribe(resp =>
      {
        console.log('hola');
      });
  }


}
