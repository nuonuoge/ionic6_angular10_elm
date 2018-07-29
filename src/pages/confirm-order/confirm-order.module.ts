import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConfirmOrderPage } from './confirm-order';
import { ComponentsModule } from '../../components';

@NgModule({
  declarations: [
    ConfirmOrderPage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(ConfirmOrderPage)
  ]
})
export class ConfirmOrderPageModule {}
