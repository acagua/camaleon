import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { StoreComponent } from './components/store/store.component';
import { ItemComponent } from './components/item/item.component';
import { ContactComponent } from './components/contact/contact.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';

const APP_ROUTES: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'store/:id', component: StoreComponent },
  { path: 'item/:id', component: ItemComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'shoppingCart', component: ShoppingCartComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: '', component: HomeComponent },
  { path: '**', pathMatch: 'full', redirectTo: '' }
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);
