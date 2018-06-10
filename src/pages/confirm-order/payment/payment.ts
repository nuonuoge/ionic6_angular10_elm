import { Component, OnInit } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AppService, CartService, DataService, LocalStorageService, TabsService, ShopService } from '../../../service';
import { Tabs } from '../../../class/tabs';
@IonicPage()
@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html'
})
export class PaymentPage extends Tabs implements OnInit {
  payDetail: boolean = false;
  showAlert: boolean = false;
  alertText: string = '';
  payWay: number = 1;
  countNum: number = 900; // 倒计时15分钟
  gotoOrders: boolean = false;
  timer: any;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public tabsService: TabsService,
    public localStorageService: LocalStorageService,
    public appService: AppService,
    public cartService: CartService,
    public dataService: DataService) {
    super(tabsService);
  }

  ngOnInit() {
    // 清除购物车中当前商铺的信息
    if (this.appService.shopId) {
      this.cartService.clearCart(this.appService.shopId);
    }
    this.remainingTime();
    // this.payDetail = await payRequest(this.orderMessage.order_id, this.userInfo.user_id);
    // if (this.payDetail.message) {
    //   this.showAlert = true;
    //   this.alertText = this.payDetail.message;
    //   return
    // }
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

  // 倒计时
  remainingTime() {
    clearInterval(this.timer);
    this.timer = setInterval(() => {
      this.countNum--;
      if (this.countNum === 0) {
        clearInterval(this.timer);
        this.showAlert = true;
        this.alertText = '支付超时';
      }
    }, 1000);
  }
  // 确认付款
  confirmPay() {
    this.presentConfirm('当前环境无法支付，请打开官方APP进行付款?');
    this.gotoOrders = true;
  }

}