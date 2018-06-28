import { Component } from '@angular/core';
import { AppService, LocalStorageService } from '../../service';
import { UserInfo } from '../../class';

@Component({
  selector: 'login-header',
  templateUrl: 'login-header.html'
})
export class LoginHeaderComponent extends UserInfo {
  constructor(public localStorageService: LocalStorageService, public appService: AppService) {
    super(appService, localStorageService);
  }
}
