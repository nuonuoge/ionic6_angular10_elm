import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TabsPage } from './tabs.page';
import { MsitePage } from '../msite/msite.page';
import { SearchPage } from '../search/search.page';
import { OrderPage } from '../order/order.page';
import { ProfilePage } from '../profile/profile.page';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/app/tab/(msite:msite)',
    pathMatch: 'full'
  },
  {
    path: 'tab',
    component: TabsPage,
    children: [
      {
        path: '',
        redirectTo: '/app/tab/(msite:msite)',
        pathMatch: 'full'
      },
      {
        path: 'msite',
        outlet: 'msite',
        component: MsitePage
      },
      {
        path: 'search',
        outlet: 'search',
        component: SearchPage
      },
      {
        path: 'order',
        outlet: 'order',
        component: OrderPage
      },
      {
        path: 'profile',
        outlet: 'profile',
        component: ProfilePage
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
