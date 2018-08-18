import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared';
import { SearchPage } from './search.page';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([{ path: '', component: SearchPage }])
  ],
  declarations: [SearchPage]
})
export class SearchPageModule {}
