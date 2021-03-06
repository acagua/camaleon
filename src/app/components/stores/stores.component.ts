import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/app/models/category.model';
import { StoreService } from 'src/app/services/store.service';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-stores',
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.less']
})
export class StoresComponent implements OnInit
{
  categories: Category[] = [];
  categoryStores: any[] = [];

  constructor(
    public _categoryService: CategoryService,
    public _storeService: StoreService,
    private titleService: Title,
    private meta: Meta)
  {
    this._categoryService.getCategoriesRandom(6)
      .subscribe((documents) =>
      {
        // if (documents.length === 5 || true) //TODO quitar el || true
        {
          this.categories = documents;

          for (let i = 0; i < this.categories.length; i++)
          {
            const category = this.categories[i];

            this._storeService.getStoresRandomByCategory(category._id, 6)
              .subscribe((documents) =>
              {
                this.categoryStores.push({ category: category, stores: documents });
              });
          }
        }
      });
  }

  ngOnInit()
  {
    this.titleService.setTitle('Marcas');
    this.meta.addTag({name: 'keywords', content: 'Camaleon.shop, Camaleon, Marcas, Tiendas, Emprendedores'});
    this.meta.addTag({name: 'description', content: 'Conoce las marcas que hacen parte de Camaleon'});
    this.meta.addTag({name: 'robots', content: 'all, follow'});
  }

}
