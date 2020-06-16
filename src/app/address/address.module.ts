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
        loadChildren: () => import('./add-address/add-address.module').then(m => m.AddAddressPageModule)
      },
      {
        path: 'search',
        loadChildren: () => import('./search-address/search-address.module').then(m => m.SearchAddressPageModule)
      }
    ])
  ],
  declarations: [AddressPage]
})
export class AddressPageModule { }
