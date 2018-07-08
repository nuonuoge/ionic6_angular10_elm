import { Component } from '@angular/core';
import { App } from 'ionic-angular';
import { AppService, LocalStorageService } from '../../service';
import { UserInfo } from '../../class';

@Component({
  selector: 'login-header',
  templateUrl: 'login-header.html'
})
export class LoginHeaderComponent extends UserInfo {
  constructor(public localStorageService: LocalStorageService,
    public appService: AppService,
    public appCtrl: App) {
    super(appService, localStorageService);
  }

  public toProfile() {
    this.appCtrl.getRootNav().push('TabsPage', {
      pageName: 'ProfilePage'
    });
  }
}
