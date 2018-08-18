import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared';
import { ShopDetailPage } from './shop-detail.page';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([{ path: '', component: ShopDetailPage }])
  ],
  declarations: [ShopDetailPage]
})
export class ShopDetailPageModule {}

