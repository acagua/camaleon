import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { StoreService } from 'src/app/services/store.service';
import { Store } from 'src/app/models/store.model';
import { Item } from 'src/app/models/item.model';
import { ItemService } from 'src/app/services/item.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import Swal from 'sweetalert2';
import { ItemCart } from 'src/app/models/item-cart.model';
import { Category } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit
{

  itemsLines: Item[][] = [];

  itemsLine1: Item[] = [];
  itemsLine2: Item[] = [];
  storesLine1: Store[] = [];

  category1: Category = null;
  category2: Category = null;
  category3: Category = null;

  categories: Category[] = [];

  @Input()
  dataSlideTo: string;

  constructor(private router: Router,
    public _storeService: StoreService,
    public _itemService: ItemService,
    public _cartService: ShoppingCartService,

    public _categoryService: CategoryService)
  {

    this._categoryService.getCategoriesRandom(2)
      .subscribe((documents) =>
      {
        if (documents.length === 2)
        {
          this.categories = documents;

          console.log('b:::categories: ' + JSON.stringify(this.categories));

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

    this._storeService.getStoresRandom(4)
      .subscribe((stores) =>
      {
        this.storesLine1 = stores;
      });

  }


  ngOnInit()
  {
    window.scrollTo(0, 0);
  }


  goStore(store: Store)
  {
    this.router.navigate(['/store', store.codeName]);
  }


  goCategory(pCategory: Category)
  {
    this.router.navigate(['/category', pCategory._id]);
  }


  addToCart(pItem: Item)
  {
    Swal.fire('Se ha añadido al carrito!', '', 'success');

    let itemCart = new ItemCart(pItem, 1);

    this._cartService.addToCart(itemCart);
  }

  //----------categorías aquí para no traer de bd
  // categories: Category[] = [
  //   new Category('Ropa', 'Ropa divina!', '../../../assets/img/icons/ropa.png', 'black', '5c965809b3d5ba1284b2e247'),
  //   new Category('Accesorios', 'Ropa divina!', '../../../assets/img/icons/accesorios.png', 'orange', '5c96584e21c7361284230a90'),
  //   new Category('Mascotas', 'Ropa divina!', '../../../assets/img/icons/mascotas.png', 'green', '5c96588a21c7361284230a91'),
  //   new Category('Bienestar', 'Ropa divina!', '../../../assets/img/icons/bienestar.png', 'red', '5c9658a421c7361284230a92'),
  //   new Category('Tecnología', 'Ropa divina!', '../../../assets/img/icons/tecnologia.png', 'blue', '5c965bfb21c7361284230a93'),
  //   new Category('Hogar', 'Ropa divina!', '../../../assets/img/icons/hogar.png', 'pink', '5c965c1321c7361284230a94')
  // ];

}
