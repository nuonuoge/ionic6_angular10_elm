import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  currentTab: number = 0;
  tintColor: string = '#108ee9';
  unselectedTintColor: string = '#888';
  tabbarStyle: object = {
    position: 'fixed',
    height: '100%',
    width: '100%',
    top: 0
  };
  constructor(public router: Router) {
    this.getCurrentTab();
  }

  getCurrentTab() {
    let currentRouter: string = this.router.url;
    if (currentRouter.includes('msite')) {
      this.currentTab = 1;
    } else if (currentRouter.includes('search')) {
      this.currentTab = 2;
    }
    if (currentRouter.includes('order')) {
      this.currentTab = 3;
    }
    if (currentRouter.includes('profile')) {
      this.currentTab = 4;
    }
  }

  onPress(event) {
    this.currentTab = event.key;
    switch (event.title) {
      case '外卖':
        this.router.navigate(['/app/tab/msite']);
        break;
      case '搜索':
        this.router.navigate(['/app/tab/search']);
        break;
      case '订单':
        this.router.navigate(['/app/tab/order']);
        break;
      case '我的':
        this.router.navigate(['/app/tab/profile']);
        break;
    }
  }

}
