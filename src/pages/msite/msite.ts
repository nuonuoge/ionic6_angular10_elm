import { Component, OnInit, NgZone, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppService, DataService } from '../../service';
import { Content } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-msite',
  templateUrl: 'msite.html'
})
export class MsitePage implements OnInit {
  geohash: string;
  addressTitle: string;
  foodTypes: any[];
  slideActive: boolean;
  imgBaseUrl = 'https://fuss10.elemecdn.com';
  params: any;
  foodParams: any;
  hasGetData: boolean;

  shopList: any[];
  latitude: string;
  longitude: string;
  offset: number;
  restaurantCategoryId: string;
  touchend: boolean;
  showLoading: boolean;
  preventRepeatReuqest: boolean = false; // 到达底部加载数据，防止重复加载
  @ViewChild(Content) content: Content;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public appService: AppService,
    public dataService: DataService,
    public zone: NgZone,
    public elementRef: ElementRef) {
    this.geohash = navParams.get('geohash');
    this.params = { geohash: this.geohash };
    this.offset = 0;
    this.shopList = [];
    this.touchend = false;
    this.showLoading = true;

  }

  ngOnInit() {
    this.latitude = this.geohash.split(',')[0];
    this.longitude = this.geohash.split(',')[1];
    this.getPoisGeohash();
    this.getMsiteFoodTypes();
    this.getShopList();
  }

  getCategoryId(url) {
    let urlData = decodeURIComponent(url.split('=')[1].replace('&target_name', ''));
    if (/restaurant_category_id/gi.test(urlData)) {
      return JSON.parse(urlData).restaurant_category_id.id;
    } else {
      return '';
    }
  }

  getPoisGeohash() {
    this.dataService.getPoisGeohash(this.geohash).subscribe(res => {
      this.addressTitle = res.name;
      this.hasGetData = true;
    });
  }

  getMsiteFoodTypes() {
    this.dataService.getMsiteFoodTypes(this.geohash).subscribe(res => {
      let resArr = [...res];
      this.foodTypes = this.spliceArray(resArr, 8);
    });
  }
  getShopList() {
    this.dataService.getShopList(this.latitude, this.longitude, this.offset, this.restaurantCategoryId).subscribe(res => {
      if (res.length < 20) {
        this.touchend = true;
      }
      this.shopList = [...this.shopList, ...res];
      this.showLoading = false;
      this.preventRepeatReuqest = false;
    });
  }
  spliceArray(array: any[], spliceLength: number) {
    let length: number = array.length;
    let foodArr: any[] = [];
    for (let i = 0, j = 0; i < length; i += spliceLength, j++) {
      foodArr[j] = array.splice(0, spliceLength);
    }
    return foodArr;
  }

  slideChanged(val: any) {
    let slideIndex = val.getActiveIndex();
    this.slideActive = slideIndex % 2 !== 0;
  }

  toSearch() {
    this.navCtrl.parent.select(this.appService.getTabPagesIndex('SearchPage'));
  }

  loaderMore(event: any) {
    this.zone.run(() => {
      let scrollContent = this.elementRef.nativeElement.getElementsByClassName('scroll-content')[0];
      if (scrollContent.scrollTop + scrollContent.clientHeight >= scrollContent.scrollHeight) {
        if (this.preventRepeatReuqest) {
          return;
        }
        this.offset += 20;
        this.showLoading = true;
        this.preventRepeatReuqest = true;
        this.getShopList();
      }
    });
  }
}
