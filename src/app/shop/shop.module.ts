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
          { path: 'detail', loadChildren: './detail/shop-detail.module#ShopDetailPageModule' },
          { path: 'evaluate', loadChildren: './evaluate/evaluate.module#ShopEvaluatePageModule' }
        ]
      }
    ])
  ],
  declarations: [ShopPage]
})
export class ShopPageModule { }
