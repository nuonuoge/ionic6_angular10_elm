import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared';
import { AddressPage } from './address.page';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: AddressPage,
      },
      {
        path: 'add',
        loadChildren: './add-address/add-address.module#AddAddressPageModule'
      },
      {
        path: 'search',
        loadChildren: './search-address/search-address.module#SearchAddressPageModule'
      }
    ])
  ],
  declarations: [AddressPage]
})
export class AddressPageModule { }
