import { Component, OnInit, NgZone, ElementRef } from '@angular/core';
import { AlertController, IonicPage, NavController } from 'ionic-angular';
import { DataService, LocalStorageService } from '../../service';
import { ImgBaseUrl } from '../../environments/env';

@IonicPage()
@Component({
  selector: 'page-order',
  templateUrl: 'order.html'
})
export class OrderPage implements OnInit {
  orderList: any;
  showLoading: boolean = true;
  offset: number = 0;
  imgBaseUrl: string = ImgBaseUrl;
  touchEnd: boolean = false;
  preventRepeatReuqest: boolean = false; // 到达底部加载数据，防止重复加载
  constructor(public dataService: DataService,
    public localStorageService: LocalStorageService,
    public alertCtrl: AlertController,
    public navCtrl: NavController,
    public zone: NgZone,
    public elementRef: ElementRef) {
    this.orderList = [];
  }

  ngOnInit() {
    let userId = this.localStorageService.getStore('userId');
    if (userId) {
      this.dataService.getOrderList(userId, this.offset).subscribe(res => {
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
        this.showLoading = true;
        let userId = this.localStorageService.getStore('userId');
        this.dataService.getOrderList(userId, this.offset).subscribe(res => {
          if (res.length < 10) {
            this.touchEnd = true;
          }
          this.orderList = [...this.orderList, ...res];
          this.showLoading = false;
          this.preventRepeatReuqest = true;
        });
      }
    });
  }
  // 显示详情页
  showDetail(item) {
    // this.SAVE_ORDER(item);
    // this.preventRepeat = false;
    // this.$router.push('/order/orderDetail');
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
