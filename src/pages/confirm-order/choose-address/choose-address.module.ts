import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChooseAddressPage } from './choose-address';

@NgModule({
  declarations: [
    ChooseAddressPage,
  ],
  imports: [
    IonicPageModule.forChild(ChooseAddressPage)
  ]
})
export class ConfirmOrderPageModule {}