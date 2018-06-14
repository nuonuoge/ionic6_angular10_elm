import { Component, OnInit } from '@angular/core';
import { IonicPage } from 'ionic-angular';
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
