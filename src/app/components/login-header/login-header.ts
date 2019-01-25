import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppService, LocalStorageService } from '../../service';
import { UserInfo } from '../../class';

@Component({
  selector: 'login-header',
  templateUrl: 'login-header.html',
  styleUrls: ['login-header.scss']
})
export class LoginHeaderComponent extends UserInfo {
  constructor(public router: Router,
    public localStorageService: LocalStorageService,
    public appService: AppService) {
    super(appService, localStorageService);
  }

  public toProfile() {
    this.router.navigateByUrl('/tabs/profile');
  }
}
