import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared';
import { MsitePage } from './msite.page';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([{ path: '', component: MsitePage }])
  ],
  declarations: [MsitePage]
})
export class MsitePageModule {}
