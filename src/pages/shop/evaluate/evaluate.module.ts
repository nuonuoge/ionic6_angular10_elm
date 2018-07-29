import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ComponentsModule } from '../../../components';
import { ShopEvaluatePage } from './evaluate';

@NgModule({
  declarations: [
    ShopEvaluatePage
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(ShopEvaluatePage)
  ],
  exports: [
    ShopEvaluatePage
  ]
})
export class ShopEvaluatePageModule {}
