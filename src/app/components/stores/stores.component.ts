import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/app/models/category.model';
import { StoreService } from 'src/app/services/store.service';
import { Store } from 'src/app/models/store.model';

@Component({
  selector: 'app-stores',
  templateUrl: './stores.component.html'
})
export class StoresComponent implements OnInit
{
  categories: Category[] = [];
  storesLines: Store[][] = [];

  constructor(
    public _categoryService: CategoryService,
    public _storeService: StoreService
  )
  {
    this._categoryService.getCategoriesRandom(3)
      .subscribe((documents) =>
      {
        if (documents.length === 3)
        {
          this.categories = documents;

          console.log('b:::categories: ' + JSON.stringify(documents));

          for (let i = 0; i < this.categories.length; i++)
          {
            const category = this.categories[i];

            this._storeService.getStoresRandomByCategory(category._id, 6)
              .subscribe((documents) =>
              {
                this.storesLines.push(documents);
              });
          }
        }
      });
  }

  ngOnInit()
  {
  }

}
