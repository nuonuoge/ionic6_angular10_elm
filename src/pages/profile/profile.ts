import { Component, OnDestroy, OnInit } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { AppService, DataService, LocalStorageService } from '../../service';
import { Subscription } from 'rxjs/Subscription';
import { ImgBaseUrl } from '../../environments/env';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage implements OnDestroy, OnInit {
  userId: string;
  userInfo: any;
  mobile: string;
  subEvent: Subscription;
  imgBaseUrl: string = ImgBaseUrl;

  constructor(public appService: AppService,
    public dataService: DataService,
    public localStorageService: LocalStorageService) {
    this.subEvent = this.appService.userInfoEvent.subscribe(res => {
      this.userId = this.localStorageService.getStore('userId');
      this.ngOnInit();
    });
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

  ngOnDestroy() {
    if (this.subEvent) {
      this.subEvent.unsubscribe();
    }
  }

}
