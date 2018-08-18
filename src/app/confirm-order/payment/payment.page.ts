import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController} from '@ionic/angular';
import { AppService, CartService, DataService, LocalStorageService } from '../../service';

@Component({
  selector: 'page-payment',
  templateUrl: 'payment.page.html',
  styleUrls: ['payment.page.scss']
})
export class PaymentPage implements OnInit {
  payDetail: boolean = false;
  showAlert: boolean = false;
  alertText: string = '';
  payWay: number = 1;
  countNum: number = 900; // 倒计时15分钟
  gotoOrders: boolean = false;
  timer: any;
  constructor(
    public router: Router,
    public alertCtrl: AlertController,
    public localStorageService: LocalStorageService,
    public appService: AppService,
    public cartService: CartService,
    public dataService: DataService) {
  }

  ngOnInit() {
    // 清除购物车中当前商铺的信息
    if (this.appService.shopId) {
      this.cartService.clearCart(this.appService.shopId);
    }
    this.remainingTime();
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
            this.router.navigateByUrl('/app/tab/(order:order)')
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
      }
    }, 1000);
  }
  // 确认付款
  confirmPay() {
    this.presentConfirm('当前环境无法支付，请打开官方APP进行付款?');
    this.gotoOrders = true;
  }

}
