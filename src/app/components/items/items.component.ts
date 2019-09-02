import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { ItemService } from 'src/app/services/item.service';
import { Router } from '@angular/router';
import { Item } from 'src/app/models/item.model';
import { Category } from 'src/app/models/category.model';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.less']
})
export class ItemsComponent implements OnInit
{

  categories: Category[] = [];
  categoryItems: any[] = [];

  constructor(private router: Router,
    public _itemService: ItemService,
    public _cartService: ShoppingCartService,
    public _categoryService: CategoryService,
    private titleService: Title,
    private meta: Meta)
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
                this.categoryItems.push({ category: category, items: items });
              });
          }
        }
      });
  }

  ngOnInit()
  {
    this.titleService.setTitle('Catálogo');
    this.meta.addTag({name: 'keywords', content: 'Camaleon.shop, Camaleon, Catálogo, Catalogo, Artículos, artículos, items, Productos, Producto'});
    this.meta.addTag({name: 'description', content: 'Encuentra productos exclusivos y novedosos de emprendedores colombianos en un solo lugar'});
    this.meta.addTag({name: 'robots', content: 'all, follow'});
  }

}
