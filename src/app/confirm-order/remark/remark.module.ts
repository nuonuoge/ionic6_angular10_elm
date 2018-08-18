import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared';
import { RemarkPage } from './remark.page';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '', component: RemarkPage
      }
    ])
  ],
  declarations: [RemarkPage]
})
export class RemarkPageModule { }

