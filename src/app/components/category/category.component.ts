import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/models/item.model';
import { CategoryService } from 'src/app/services/category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/models/category.model';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html'
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
  )
  {
    this.route.params.subscribe(params =>
    {
      this._categoryService.getCategory(params['id'])
        .subscribe((category) =>
        {
          this.category = category;

          this._itemService.getItemsByCategory(this.category._id)
            .subscribe((items) =>
            {
              this.items = items;
            });

        });
    });
  }

  ngOnInit()
  {
  }

}
