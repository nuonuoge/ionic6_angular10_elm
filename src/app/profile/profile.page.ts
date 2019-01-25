import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService, DataService, LocalStorageService } from '../service';
import { UserInfo } from '../class';
import { ImgBaseUrl } from '../config/env';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss']
})
export class ProfilePage extends UserInfo implements OnDestroy, OnInit {
  userId: string;
  userInfo: any;
  mobile: string;
  imgBaseUrl: string = ImgBaseUrl;

  constructor(public appService: AppService,
    public dataService: DataService,
    public localStorageService: LocalStorageService,
    public router: Router) {
      super(appService, localStorageService);
  }

  ngOnInit() {
    this.userId = this.localStorageService.getStore('userId');
    if (this.userId) {
      this.getUserInfo(this.userId);
    } else {
      this.mobile = '暂无绑定手机号';
    }
  }

  public getUserInfo(userId: string) {
    this.dataService.getUserInfo(userId).subscribe(res => {
      this.userInfo = res;
      this.mobile = this.userInfo.mobile || '暂无绑定手机号';
    });
  }

  public exit() {
    this.localStorageService.removeStore('userId');
    this.userInfo = {};
    this.appService.userInfoEvent.emit('update');
  }

  public toOrderPage() {
    this.router.navigateByUrl('/tabs/order');
  }

}
