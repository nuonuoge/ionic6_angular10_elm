
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared';
import { CityPage } from './city.page';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([{ path: '', component: CityPage }])
  ],
  declarations: [CityPage]
})
export class CityPageModule {}
