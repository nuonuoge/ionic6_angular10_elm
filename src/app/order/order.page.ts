import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AppService, DataService, LocalStorageService } from '../service';
import { ImgBaseUrl } from '../config/env';
import { UserInfo } from '../class';

@Component({
  selector: 'page-order',
  templateUrl: 'order.page.html',
  styleUrls: ['order.page.scss']
})
export class OrderPage extends UserInfo implements OnInit, OnDestroy {
  orderList: any;
  showLoading: boolean = true;
  offset: number = 0;
  imgBaseUrl: string = ImgBaseUrl;
  touchEnd: boolean = false;
  preventRepeatReuqest: boolean = false; // 到达底部加载数据，防止重复加载
  params: {geohash: string};
  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public appService: AppService,
    public dataService: DataService,
    public localStorageService: LocalStorageService,
    public alertCtrl: AlertController) {
      super(appService, localStorageService);
  }

  ngOnInit() {
    this.params = { geohash: this.appService.geohash };
    this.orderList = [];
    if (this.userId) {
      this.dataService.getOrderList(this.userId, this.offset).subscribe(res => {
        this.orderList = [...res];
        this.showLoading = false;
      });
    } else {
      this.showLoading = false;
    }
  }

  loaderMore(event: any) {
    this.offset += 10;
    this.preventRepeatReuqest = true;
    this.showLoading = true;
    let userId = this.localStorageService.getStore('userId');
    this.dataService.getOrderList(userId, this.offset).subscribe(res => {
      if (res.length < 10) {
        this.touchEnd = true;
        event.target.disabled = true;
      }
      this.orderList = [...this.orderList, ...res];
      this.showLoading = false;
      this.preventRepeatReuqest = false;
    });
    event.target.complete();
  }
  // 显示详情页
  showDetail(item: any) {
    this.appService.orderDetail = item;
    this.preventRepeatReuqest = false;
    this.router.navigateByUrl('/order/detail');
  }

  async presentConfirm(message: string) {
    let alert = await this.alertCtrl.create({
      header: '确认支付',
      message: message,
      cssClass: 'confirm',
      buttons: [
        {
          text: '确认',
          handler: () => {
            this.router.navigateByUrl('/app/tab/(order:order)');
          }
        }
      ]
    });
    alert.present();
  }

  toPay() {
    this.presentConfirm('付款功能未开放');
  }
}
