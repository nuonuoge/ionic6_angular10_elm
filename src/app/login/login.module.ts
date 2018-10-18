import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared';
import { LoginPage } from './login.page';
import { ToastComponent } from 'ng-zorro-antd-mobile';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([{ path: '', component: LoginPage }])
  ],
  declarations: [LoginPage],
  entryComponents: [ToastComponent]
})
export class LoginPageModule {}
