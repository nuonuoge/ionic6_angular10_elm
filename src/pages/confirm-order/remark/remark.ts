import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppService, DataService, LocalStorageService, TabsService, CartService, ShopService } from '../../../service';
import { Tabs } from '../../../class/tabs';
@IonicPage()
@Component({
  selector: 'page-remark',
  templateUrl: 'remark.html'
})
export class RemarkPage extends Tabs implements OnInit {
  showLoading: boolean = true;
  remarkList: any;
  remarkText: any = {};
  inputText: string = '';
  id: string;
  sig: any;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public tabsService: TabsService,
    public localStorageService: LocalStorageService,
    public appService: AppService,
    public dataService: DataService) {
    super(tabsService);
    this.id = this.navParams.get('id');
    this.sig = this.navParams.get('sig');
  }

  ngOnInit() {
    this.remarkList = this.dataService.getRemark(this.id, this.sig).subscribe(res => {
      this.remarkList = res;
      this.showLoading = false;
    });
  }

  chooseRemark(index: number, remarkIndex: string, text: string) {
    this.remarkText[index] = [remarkIndex, text];
    this.remarkText = Object.assign({}, this.remarkText);
  }

  confirmRemark() {
    this.appService.confirmRemark = { remarkText: this.remarkText, inputText: this.inputText };
    this.navCtrl.pop();
  }
}