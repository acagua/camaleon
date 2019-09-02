import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/models/item.model';
import { CategoryService } from 'src/app/services/category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/models/category.model';
import { ItemService } from 'src/app/services/item.service';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit
{

  items: Item[];

  category: Category;

  constructor(
    public _categoryService: CategoryService,
    public _itemService: ItemService,
    private route: ActivatedRoute,
    private router: Router,
    private titleService: Title,
    private meta: Meta)
  {
    this.route.params.subscribe(params =>
    {
      this._categoryService.getCategory(params['id'])
        .subscribe((category) =>
        {
          this.category = category;
          this._itemService.getItemsRandomByCategory(this.category._id, 20)
          .subscribe((items) =>
          {
            this.items = items;
          });
          this.titleService.setTitle('Categoría | ' + this.category.name);
          this.meta.addTag({name: 'keywords', content: 'Camaleon.shop, Camaleon, Categoría, Categoria, ' + this.category.name});
          this.meta.addTag({name: 'description', content: 'Tenemos ropa para diferentes gustos. Enamórate y compra en Camaleon'});
          this.meta.addTag({name: 'robots', content: 'all, follow'});
        });
    });
  }

  ngOnInit()
  {
    
  }

}
