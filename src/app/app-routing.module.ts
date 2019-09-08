import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { StoreComponent } from './components/store/store.component';
import { ItemComponent } from './components/item/item.component';
import { ContactComponent } from './components/contact/contact.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { LoginGuard } from './services/guards/login.guard';
import { OrderComponent } from './components/order/order.component';
import { CategoryComponent } from './components/category/category.component';
import { StoresComponent } from './components/stores/stores.component';
import { ItemsComponent } from './components/items/items.component';
import { PasswordForgotComponent } from './components/password-forgot/password-forgot.component';
import { PasswordNewComponent } from './components/password-new/password-new.component';
import { PasswordNewGuard } from './services/guards/password-new.guard';
import { PayuResponseComponent } from './components/payu-response/payu-response.component';
import { AdminComponent } from './components/admin/admin/admin.component';
import { AdminStoreComponent } from './components/admin/admin-store/admin-store.component';
import { AdminHomeComponent } from './components/admin/admin-home/admin-home.component';

const APP_ROUTES: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'store/:id', component: StoreComponent },
  { path: 'category/:id', component: CategoryComponent },
  { path: 'item/:id', component: ItemComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'shopping-cart', component: ShoppingCartComponent },
  { path: 'checkout', component: CheckoutComponent, canActivate: [LoginGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [LoginGuard] },
  { path: 'order/:id', component: OrderComponent },
  { path: 'stores', component: StoresComponent },
  { path: 'items', component: ItemsComponent },
  { path: 'forgot-password', component: PasswordForgotComponent },
  { path: 'new-password', component: PasswordNewComponent, canActivate: [PasswordNewGuard] },
  { path: 'response', component: PayuResponseComponent },
  {
    path: 'admin', component: AdminComponent,
    canActivate: [LoginGuard],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: AdminHomeComponent },
      { path: 'store', component: AdminStoreComponent }
    ]
  },
  { path: '', component: HomeComponent },
  { path: '**', pathMatch: 'full', redirectTo: '' }
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);
