import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared';
import { ChooseAddressPage } from './choose-address.page';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '', component: ChooseAddressPage
      }
    ])
  ],
  declarations: [ChooseAddressPage]
})
export class ChooseAddressPageModule { }

