import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ComponentsModule } from '../../../components';
import { ShopDetailPage } from './shop-detail';

@NgModule({
  declarations: [
    ShopDetailPage
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(ShopDetailPage),
  ],
  exports: [
    ShopDetailPage
  ]
})
export class ShopPageModule {}
