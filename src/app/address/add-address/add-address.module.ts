import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared';
import { AddAddressPage } from './add-address.page';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '', component: AddAddressPage
      }
    ])
  ],
  declarations: [AddAddressPage]
})
export class AddAddressPageModule { }

