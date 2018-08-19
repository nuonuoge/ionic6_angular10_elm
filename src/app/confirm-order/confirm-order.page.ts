import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AppService, DataService, LocalStorageService, CartService, ShopService } from '../service';
import { UserInfo } from '../class';
import { ImgBaseUrl } from '../config/env';

@Component({
  selector: 'page-confirm-order',
  templateUrl: 'confirm-order.page.html',
  styleUrls: ['confirm-order.page.scss']
})
export class ConfirmOrderPage extends UserInfo implements OnInit {
  geohash: string = ''; // geohash位置信息
  shopId: string = null; // 商店id值
  showLoading: boolean = true; // 显示加载动画
  checkoutData: any = null; // 数据返回值
  shopCart: string = null; // 购物车数据
  imgBaseUrl: string; // 图片域名
  payWayId: 1; // 付款方式
  showAlert: boolean = false; // 弹出框
  alertText: string = null; // 弹出框内容
  iconColor: any = { '公司': '#4cd964', '学校': '#3190e8', '家': '#ff5722' };
  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public toastCtrl: ToastController,
    public localStorageService: LocalStorageService,
    public cartService: CartService,
    public shopService: ShopService,
    public appService: AppService,
    public dataService: DataService) {
    super(appService, localStorageService);
    this.geohash = this.route.snapshot.queryParamMap.get('geohash');
    this.shopId = this.route.snapshot.queryParamMap.get('shopId');
    this.appService.geohash = this.geohash;
    this.appService.shopId = this.shopId;
  }

  getValues(obj: any) {
    let values = [];
    let keys = Object.keys(obj);
    keys.forEach(key => {
      values.push(obj[key]);
    });
    return values;
  }

  choosedAddress(): any {
    return this.appService.choosedAddress.address;
  }

  remarkList: any = function () {
    this.remarkText = this.appService.confirmRemark.remarkText;
    this.inputText = this.appService.confirmRemark.inputText;
    let str = '';
    if (this.appService.confirmRemark.remarkText) {
      this.getValues(this.appService.confirmRemark.remarkText).forEach(item => {
        str += item[1] + '，';
      });
    }
    if (this.appService.confirmRemark.inputText) {
      return str + this.appService.confirmRemark.inputText;
    } else {
      return str.substr(0, str.lastIndexOf('，'));
    }
  };

  ngOnInit() {
    this.imgBaseUrl = ImgBaseUrl;
    let initCart = this.localStorageService.getStore('buyCart');
    if (initCart) {
      this.cartService.cartList = JSON.parse(initCart);
      this.shopCart = this.cartService.cartList[this.shopId];
    }
    let newArr = new Array;
    this.getValues(this.shopCart).forEach(categoryItem => {
      this.getValues(categoryItem).forEach(itemValue => {
        this.getValues(itemValue).forEach(item => {
          newArr.push({
            attrs: [],
            extra: {},
            id: item.id,
            name: item.name,
            packing_fee: item.packing_fee,
            price: item.price,
            quantity: item.num,
            sku_id: item.sku_id,
            specs: [item.specs],
            stock: item.stock,
          });
        });
      });
    });
    // 检验订单是否满足条件
    this.dataService.checkout(this.geohash, [newArr], this.shopId).subscribe((res: any) => {
      this.checkoutData = res;
      this.initAddress();
    });
  }

  // 获取地址信息，第一个地址为默认选择地址
  initAddress() {
    if (this.userId) {
      this.dataService.getAddressList(this.userId).subscribe(res => {
        let addressRes = res;
        if (addressRes instanceof Array && addressRes.length) {
          this.appService.choosedAddress = { address: addressRes[0], index: 0 };
        }
        this.showLoading = false;
      });
    } else {
      this.showLoading = false;
    }
  }

  toRemarkPage() {
    this.router.navigate(['/confirmOrder', 'remark'], { queryParams: { id: this.checkoutData.cart.id, sig: this.checkoutData.sig } });
  }

  async toastTip(message: string) {
    let toast = await this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: 'middle'
    });
    toast.present();
  }

  // 确认订单
  confirmOrder() {
    // 用户未登录时弹出提示框
    let userId = this.localStorageService.getStore('userId');
    if (!userId) {
      this.router.navigate(['/login']);
      return;
      // 未选择地址则提示
    } else if (!this.choosedAddress()) {
      this.toastTip('请添加一个收货地址');
      return;
    }
    // 发送订单信息
    this.dataService.placeOrders(userId, this.checkoutData.cart.id, this.choosedAddress().id,
      this.remarkList(), this.checkoutData.cart.groups, this.geohash, this.checkoutData.sig).subscribe(res => {
        let orderRes = res;
        // 第一次下单的手机号需要进行验证，否则直接下单成功
        if (orderRes.need_validation) {
        } else {
          this.router.navigate(['/confirmOrder', 'payment']);
        }
      });
  }

}
