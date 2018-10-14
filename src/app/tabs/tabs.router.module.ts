import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'tab',
    pathMatch: 'full'
  },
  {
    path: 'tab',
    component: TabsPage,
    children: [
      {
        path: '',
        redirectTo: 'msite',
        pathMatch: 'full'
      },
      {
        path: 'msite',
        loadChildren: '../msite/msite.module#MsitePageModule'
      },
      {
        path: 'search',
        loadChildren: '../search/search.module#SearchPageModule'
      },
      {
        path: 'order',
        loadChildren: '../order/order.module#OrderPageModule'
      },
      {
        path: 'profile',
        loadChildren: '../profile/profile.module#ProfilePageModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
