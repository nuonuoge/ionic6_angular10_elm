import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared';
import { GangMainComponent } from './gang-main.component';

@NgModule({
  declarations: [],
  imports: [
    SharedModule,
    RouterModule.forChild([{ path: '', component: GangMainComponent }])
  ],
})
export class GangMainModule { }
