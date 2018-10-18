import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService, DataService } from '../service';


@Component({
  selector: 'page-msite',
  templateUrl: 'msite.page.html',
  styleUrls: ['msite.page.scss']
})
export class MsitePage implements OnInit {
  geohash: string;
  addressTitle: string;
  foodTypes: any[];
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
  dtPullToRefreshStyle = { height: '100%' };

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public appService: AppService,
    public dataService: DataService) {
    this.geohash = this.route.snapshot.queryParamMap.get('geohash');
    this.offset = 0;
    this.shopList = [];
    this.touchend = false;
    this.showLoading = true;

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

  toSearch() {
    this.router.navigateByUrl('/app/tab/(search:search)?geohash=' + this.geohash);
  }

  loaderMore(event: any) {
    if (this.touchend) {
      return;
    }
    if (this.preventRepeatReuqest) {
      return;
    }
    this.offset += 20;
    this.showLoading = true;
    this.preventRepeatReuqest = true;
    this.getShopList();
  }
}
