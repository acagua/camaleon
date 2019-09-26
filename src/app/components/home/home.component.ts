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
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit
{
  categoryItems: any[] = [];
  storesLine: Store[] = [];
  categories: Category[] = [];
  isMobile: Boolean = false;
  defaultImage: String = '../../../assets/img/logo-gris.png';
  //categorías aquí para no traer de bd
  categoriesTop: Category[] = [
    new Category('Moda', 'Ropa divina!', '../../../assets/img/icons/moda.png', 'pink', '5c965809b3d5ba1284b2e247'),
    new Category('Accesorios', 'Cosas lindas!', '../../../assets/img/icons/accesorios.png', 'orange', '5c96584e21c7361284230a90'),
    new Category('Kids', 'Cosas para niños bellas!', '../../../assets/img/icons/mascotas.png', 'salmon', '5d3e61aebeaec02838de29e7'),
    new Category('Lyfestyle', 'Ropa divina!', '../../../assets/img/icons/bienestar.png', 'grass', '5d3e61c4beaec02838de29e8'),
    new Category('Alimentos', 'Comida deli!', '../../../assets/img/icons/alimentos.png', 'green', '5c965bfb21c7361284230a93'),
    new Category('Hogar', 'Casas preciosas!', '../../../assets/img/icons/hogar.png', 'blue', '5c965c1321c7361284230a94')
  ];

  homesliders: any[] = [
    new Array('1', '../../../assets/img/homeslider/hs-shopper.jpg', 'items'),
    new Array('2', '../../../assets/img/homeslider/hs-store.jpg', 'contact'),
    new Array('3', '../../../assets/img/homeslider/hs-shopper-2.jpg', 'stores')
  ];

  constructor(private router: Router,
    public _storeService: StoreService,
    public _itemService: ItemService,
    public _cartService: ShoppingCartService,
    public _categoryService: CategoryService,
    private titleService: Title,
    private meta: Meta) 
  {

    this._categoryService.getCategoriesRandom(2)
      .subscribe((documents) =>
      {
        if (documents.length === 2)
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

    this._storeService.getStoresRandom(5)
      .subscribe((stores) =>
      {
        this.storesLine = stores;
      });

  }


  ngOnInit()
  {
    this.titleService.setTitle('Inicio');
    this.meta.addTag({name: 'keywords', content: 'Camaleon, Marketplace'});
    this.meta.addTag({name: 'description', content: 'Camaleon - Marketplace de emprendimientos colombianos que trae para tí productos innovadores y exclusivos'});
    this.meta.addTag({name: 'robots', content: 'all, follow'});
    window.scrollTo(0, 0);
    if (window.screen.width < 768)
    { // 768px portrait
      this.isMobile = true;
    }
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

  goHomeslider(action: String)
  {
    if (action !== '')
    {
      this.router.navigate(['/' + action]);
    }
    else 
    {
      return false;
    }
  }

}
