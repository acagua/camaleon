import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { APP_ROUTING } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { StoreComponent } from './components/store/store.component';
import { ItemComponent } from './components/item/item.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { ContactComponent } from './components/contact/contact.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ProfileComponent } from './components/profile/profile.component';
import { PipesModule } from './pipes/pipes.module';
import { OrderComponent } from './components/order/order.component';
import { CategoryComponent } from './components/category/category.component';
import { StoresComponent } from './components/stores/stores.component';
import { ItemsComponent } from './components/items/items.component';
import { PasswordForgotComponent } from './components/password-forgot/password-forgot.component';
import { PasswordNewComponent } from './components/password-new/password-new.component';
import { PayuResponseComponent } from './components/payu-response/payu-response.component';
import { AdminComponent } from './components/admin/admin/admin.component';
import { AdminStoreComponent } from './components/admin/admin-store/admin-store.component';
import { AdminHomeComponent } from './components/admin/admin-home/admin-home.component';
import { FileUploadComponent } from './components/shared/file-upload/file-upload.component';
import { LazyLoadImageModule } from 'ng-lazyload-image';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    AboutComponent,
    FooterComponent,
    StoreComponent,
    ItemComponent,
    ShoppingCartComponent,
    ContactComponent,
    CheckoutComponent,
    LoginComponent,
    ProfileComponent,
    OrderComponent,
    CategoryComponent,
    StoresComponent,
    ItemsComponent,
    PasswordForgotComponent,
    PasswordNewComponent,
    PayuResponseComponent,
    AdminComponent,
    AdminStoreComponent,
    AdminHomeComponent,
    FileUploadComponent
  ],
  imports: [
    BrowserModule,
    APP_ROUTING,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    PipesModule,
    LazyLoadImageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
