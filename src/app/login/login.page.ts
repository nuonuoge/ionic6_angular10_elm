import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ToastController } from '@ionic/angular';
import { AppService, DataService, LocalStorageService } from '../service';

@Component({
  selector: 'page-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss']
})
export class LoginPage implements OnInit {
  userName: string;
  userPwd: string;
  showPwd: boolean;
  captchaCodeImg: string;
  codeNumber: string;
  constructor(
    public location: Location,
    public appService: AppService,
    public dataService: DataService,
    public storageService: LocalStorageService,
    public toastCtrl: ToastController) {
  }

  ngOnInit() {
    this.userName = '';
    this.userPwd = '';
    this.showPwd = false;
    this.getCaptchaCode();
  }

  // 获取验证码
  getCaptchaCode() {
    this.dataService.getCaptchas().subscribe(res => {
      this.captchaCodeImg = res.code;
    });
  }

  async toastTip(message: string) {
    let toast = await this.toastCtrl.create({
        message: message,
        duration: 2000,
        position: 'middle'
      });
    toast.present();
  }

  logIn() {
    if (!this.userName) {
      this.toastTip('请填写用户名');
      return;
    }
    if (!this.userPwd) {
      this.toastTip('请填写密码');
      return;
    }
    if (!this.codeNumber) {
      this.toastTip('请填写验证码');
      return;
    }
    this.dataService.accountLogin(this.userName, this.userPwd, this.codeNumber).subscribe(res => {
      if (!res.user_id) {
        this.getCaptchaCode();
        this.toastTip(res.message);
      } else {
        this.storageService.setStore('userId', res.user_id);
        this.appService.userInfoEvent.emit('update');
        this.location.back(); 
      }
    });
  }
}
