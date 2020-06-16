import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared';
import { ShopPage } from './shop.page';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: '', redirectTo: ':id', pathMatch: 'full' },
      {
        path: ':id',
        children: [
          { path: '', component: ShopPage },
          { path: 'detail', loadChildren: () => import('./detail/shop-detail.module').then(m => m.ShopDetailPageModule) },
          { path: 'evaluate', loadChildren: () => import('./evaluate/evaluate.module').then(m => m.ShopEvaluatePageModule) }
        ]
      }
    ])
  ],
  declarations: [ShopPage]
})
export class ShopPageModule { }
