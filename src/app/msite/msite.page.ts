import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService, DataService } from '../service';
import { type } from "./data";

@Component({
  selector: 'page-msite',
  templateUrl: 'msite.page.html',
  styleUrls: ['msite.page.scss']
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

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public appService: AppService,
    public dataService: DataService) {
    this.geohash = '31.257355,120.748803';
    this.offset = 0;
    this.shopList = [];
    this.touchend = false;
    this.showLoading = false;

  }

  ngOnInit() {
    if (this.geohash) {
      this.latitude = this.geohash.split(',')[0];
      this.longitude = this.geohash.split(',')[1];
      this.params = { geohash: this.geohash };
      this.getPoisGeohash();
      this.getMsiteFoodTypes();
      this.getShopList();
    } else {
      this.dataService.getGuessCity().subscribe(res => {
        this.latitude = res.latitude;
        this.longitude = res.longitude;
        this.geohash = res.latitude + ',' + res.longitude;
        this.params = { geohash: this.geohash };
        this.getPoisGeohash();
        this.getMsiteFoodTypes();
        this.getShopList();
      });
    }
    // this.getPoisGeohash();
    // this.getMsiteFoodTypes();
    // this.getShopList();
  }

  getCategoryId(url) {
    const urlData = decodeURIComponent(url.split('=')[1].replace('&target_name', ''));
    if (/restaurant_category_id/gi.test(urlData)) {
      return JSON.parse(urlData).restaurant_category_id.id;
    } else {
      return '';
    }
  }

  getPoisGeohash() {
    // this.dataService.getPoisGeohash(this.geohash).subscribe(res => {
    //   this.addressTitle = res.name;
    //   this.hasGetData = true;
    // });
    this.hasGetData = true;
  }

  getMsiteFoodTypes() {
    this.foodTypes = type;
    console.log('foodTypes', this.foodTypes, JSON.stringify(this.foodTypes))
    const type1 = ['建材', '热卷', '冷镀', '中板', '型管', '不锈钢', '中厚管', '圆钢'];
    const type2 = ['物流', '加工', '票据', '一口价', '捡漏', '快速议价', '白条', '实时价格'];

    for (let index = 0; index < this.foodTypes[0].length; index++) {
      const element = this.foodTypes[0][index];
      element.title = type1[index];
    }
    for (let index = 0; index < this.foodTypes[1].length; index++) {
      const element = this.foodTypes[1][index];
      element.title = type2[index];
    }
    // this.dataService.getMsiteFoodTypes(this.geohash).subscribe(res => {
    //   const resArr = [...res];
    //   this.foodTypes = this.spliceArray(resArr, 8);
    // });
  }
  getShopList() {
    // this.dataService.getShopList(this.latitude, this.longitude, this.offset, this.restaurantCategoryId).subscribe(res => {
    //   if (res.length < 20) {
    //     this.touchend = true;
    //   }
    //   this.shopList = [...this.shopList, ...res];
    //   this.showLoading = false;
    //   this.preventRepeatReuqest = false;
    // });
    this.showLoading = false;
    this.preventRepeatReuqest = false;
  }
  spliceArray(array: any[], spliceLength: number) {
    const length: number = array.length;
    const foodArr: any[] = [];
    for (let i = 0, j = 0; i < length; i += spliceLength, j++) {
      foodArr[j] = array.splice(0, spliceLength);
    }
    return foodArr;
  }

  toSearch() {
    this.router.navigateByUrl('/tabs/search?geohash=' + this.geohash);
  }

  loaderMore(event: any) {
    if (this.touchend) {
      event.target.disabled = true;
      return;
    }
    if (this.preventRepeatReuqest) {
      return;
    }
    this.offset += 20;
    this.showLoading = false;
    this.preventRepeatReuqest = true;
    this.getShopList();
    event.target.complete();
  }
}
