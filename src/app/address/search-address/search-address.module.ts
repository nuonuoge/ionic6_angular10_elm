import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared';
import { SearchAddressPage } from './search-address.page';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '', component: SearchAddressPage
      }
    ])
  ],
  declarations: [SearchAddressPage]
})
export class SearchAddressPageModule { }

