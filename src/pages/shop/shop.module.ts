import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ComponentsModule } from '../../components';
import { ShopPage } from './shop';

@NgModule({
  declarations: [
    ShopPage
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(ShopPage)
  ],
  exports: [
    ShopPage
  ]
})
export class ShopPageModule {}
