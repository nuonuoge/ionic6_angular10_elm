import { Component, OnInit, NgZone, ElementRef, OnDestroy } from '@angular/core';
import { AlertController, IonicPage, NavController } from 'ionic-angular';
import { AppService, DataService, LocalStorageService } from '../../service';
import { ImgBaseUrl } from '../../environments/env';
import { UserInfo } from '../../class';

@IonicPage()
@Component({
  selector: 'page-order',
  templateUrl: 'order.html'
})
export class OrderPage extends UserInfo implements OnInit, OnDestroy {
  orderList: any;
  showLoading: boolean = true;
  offset: number = 0;
  imgBaseUrl: string = ImgBaseUrl;
  touchEnd: boolean = false;
  preventRepeatReuqest: boolean = false; // 到达底部加载数据，防止重复加载
  constructor(
    public appService: AppService,
    public dataService: DataService,
    public localStorageService: LocalStorageService,
    public alertCtrl: AlertController,
    public navCtrl: NavController,
    public zone: NgZone,
    public elementRef: ElementRef) {
      super(appService, localStorageService);
  }

  ngOnInit() {
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
  loaderMore(infiniteScroll: any) {
    this.zone.run(() => {
      let scrollContent = this.elementRef.nativeElement.getElementsByClassName('scroll-content')[0];
      if (scrollContent.scrollTop + scrollContent.clientHeight >= scrollContent.scrollHeight) {
        if (this.preventRepeatReuqest) {
          return;
        }
        this.offset += 10;
        this.preventRepeatReuqest = true;
        this.showLoading = true;
        let userId = this.localStorageService.getStore('userId');
        this.dataService.getOrderList(userId, this.offset).subscribe(res => {
          if (res.length < 10) {
            this.touchEnd = true;
          }
          this.orderList = [...this.orderList, ...res];
          this.showLoading = false;
          this.preventRepeatReuqest = false;
        });
      }
    });
  }
  // 显示详情页
  showDetail(item: any) {
    this.appService.orderDetail = item;
    this.preventRepeatReuqest = false;
    this.navCtrl.push('OrderDetailPage');
  }
  back() {
    let index = this.navCtrl.parent.previousTab().index;
    this.navCtrl.parent.select(index);
  }

  presentConfirm(message: string) {
    let alert = this.alertCtrl.create({
      title: '确认支付',
      message: message,
      cssClass: 'confirm',
      buttons: [
        {
          text: '确认',
          handler: () => {
            this.navCtrl.push('OrderPage');
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
