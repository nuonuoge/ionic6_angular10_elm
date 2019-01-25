import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'address', loadChildren: './address/address.module#AddressPageModule' },
  { path: 'tabs', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'city/:id', loadChildren: './city/city.module#CityPageModule' },
  { path: 'confirmOrder', loadChildren: './confirm-order/confirm-order.module#ConfirmOrderPageModule' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'food', loadChildren: './food/food.module#FoodPageModule' },
  { path: 'order/detail', loadChildren: './order/order-detail/order-detail.module#OrderDetailPageModule' },
  { path: 'shop', loadChildren: './shop/shop.module#ShopPageModule' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
