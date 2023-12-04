import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { SharedModule } from '../shared/shared.module';
import { ShopModule } from '../shop/shop.module';
import { FormsModule } from '@angular/forms';
import { ProductItemComponent } from '../shop/product-item/product-item.component';
import { HomeProductsItemsComponent } from './home-products-items/home-products-items.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    HomeComponent,
    HomeProductsItemsComponent  
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ShopModule,
    RouterModule
  ],
  exports:
  [
    HomeComponent,
  ]
})
export class HomeModule { }
