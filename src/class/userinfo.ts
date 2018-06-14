import { OnDestroy, OnInit } from '@angular/core';
import { AppService, LocalStorageService, TabsService } from '../service';
export class UserInfo implements OnInit, OnDestroy {
  public userId: string;
  unSubEvent: any;
  constructor(public appService: AppService,
    public localStorageService: LocalStorageService) {
    this.userId = this.localStorageService.getStore('userId');
    this.appService.userInfoEvent.subscribe(res => {
      this.userId = this.localStorageService.getStore('userId');
      this.ngOnInit();
    });
  }
  ngOnInit() {}

  ngOnDestroy() {
    if (this.unSubEvent) {
      this.unSubEvent.unsubscribe();
    }
  }
}