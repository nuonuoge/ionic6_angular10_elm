import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ComponentsModule } from '../../components';
import { FoodPage } from './food';

@NgModule({
  declarations: [
    FoodPage,
  ],
  imports: [
    IonicPageModule.forChild(FoodPage),
    ComponentsModule
  ],
  exports: [
    FoodPage
  ]
})
export class FoodPageModule {}