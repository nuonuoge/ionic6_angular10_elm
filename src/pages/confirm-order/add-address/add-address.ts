import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';
import { DataService, LocalStorageService, TabsService, AppService } from '../../../service';
import { UserInfoTabs } from '../../../class';
@IonicPage()
@Component({
  selector: 'page-add-address',
  templateUrl: 'add-address.html'
})
export class AddAddressPage extends UserInfoTabs {
  name: string = null; // 姓名
  sex: number = 1; // 性别
  phone: string = null; // 电话
  addressDetail: string = null; // 详细地址
  tag: string = ''; // 备注
  tagType: number = 1; // 备注类型
  phone_bk: boolean = false; // 是否选择备注电话
  anntherPhoneNumber: string = ''; // 备注电话
  showAlert: boolean = false; // 弹出框
  constructor(public navCtrl: NavController,
    public tabsService: TabsService,
    public localStorageService: LocalStorageService,
    public appService: AppService,
    public dataService: DataService,
    public toastCtrl: ToastController) {
    super(appService, localStorageService, tabsService);
  }

  searchAddress(): any {
    return this.appService.searchAddress;
  }

  // 选择性别
  chooseSex(sex) {
    this.sex = sex;
  }
  // 选择标签
  chooseTag(tag) {
    this.tag = tag;
  }

  toastTip(message: string) {
    let toast = this.toastCtrl.create({
        message: message,
        duration: 2000,
        position: 'bottom'
      });
      toast.present();
  }

  // 保存地址信息
  addAddress() {
    let alertText = '';
    if (!this.userId) {
      alertText = '请登录';
    } else if (!this.name) {
      this.showAlert = true;
      alertText = '请输入姓名';
    } else if (!this.phone) {
      this.showAlert = true;
      alertText = '请输入电话号码';
    } else if (!this.searchAddress()) {
      this.showAlert = true;
      alertText = '请选择地址';
    } else if (!this.addressDetail) {
      this.showAlert = true;
      alertText = '请输入详细地址';
    }
    if (alertText) {
      this.toastTip(alertText);
      return;
    }
    if (this.tag === '家') {
      this.tagType = 2;
    } else if (this.tag === '学校') {
      this.tagType = 3;
    } else if (this.tag === '公司') {
      this.tagType = 4;
    }
    this.dataService.postAddAddress(this.userId, this.searchAddress().name, this.addressDetail,
      this.appService.geohash, this.name, this.phone, this.anntherPhoneNumber, 0,
      this.sex, this.tag, this.tagType)
    .subscribe(res => {
      // 保存成功返沪上一页，否则弹出提示框
      if (res.message) {
        this.toastTip(res.message);
      } else {
        this.appService.searchAddress = '';
        this.navCtrl.pop();
        this.appService.notify.emit('refresh');
      }
    });
  }
}