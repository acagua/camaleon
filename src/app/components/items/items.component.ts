import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { ItemService } from 'src/app/services/item.service';
import { Router } from '@angular/router';
import { Item } from 'src/app/models/item.model';
import { Category } from 'src/app/models/category.model';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html'
})
export class ItemsComponent implements OnInit
{
  itemsLines: Item[][] = [];

  categories: Category[] = [];

  constructor(private router: Router,
    public _itemService: ItemService,
    public _cartService: ShoppingCartService,
    public _categoryService: CategoryService)
  {
    this._categoryService.getCategoriesRandom(4)
      .subscribe((documents) =>
      {
        if (documents.length === 4)
        {
          this.categories = documents;

          for (let i = 0; i < this.categories.length; i++)
          {
            const category = this.categories[i];

            this._itemService.getItemsRandomByCategory(category._id, 6)
              .subscribe((items) =>
              {
                this.itemsLines.push(items);
              });
          }
        }
      });
  }

  ngOnInit()
  {
  }

}
