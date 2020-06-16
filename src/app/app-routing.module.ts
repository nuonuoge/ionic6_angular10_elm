import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'address', loadChildren: () => import('./address/address.module').then(m => m.AddressPageModule) },
  { path: 'tabs', loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule) },
  { path: 'city/:id', loadChildren: () => import('./city/city.module').then(m => m.CityPageModule) },
  { path: 'confirmOrder', loadChildren: () => import('./confirm-order/confirm-order.module').then(m => m.ConfirmOrderPageModule) },
  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomePageModule) },
  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule) },
  { path: 'food', loadChildren: () => import('./food/food.module').then(m => m.FoodPageModule) },
  { path: 'order/detail', loadChildren: () => import('./order/order-detail/order-detail.module').then(m => m.OrderDetailPageModule) },
  { path: 'shop', loadChildren: () => import('./shop/shop.module').then(m => m.ShopPageModule) }
];
@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
