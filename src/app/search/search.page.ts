import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService, LocalStorageService } from '../service';

@Component({
  selector: 'page-search',
  templateUrl: 'search.page.html',
  styleUrls: ['./search.page.scss']
})
export class SearchPage implements OnInit {
  searchValue: string;
  geohash: string;
  restaurantList: any[];
  emptyResult: boolean;
  searchHistory: any[];
  showHistory: boolean;

  constructor(public route: ActivatedRoute,
    public router: Router,
    public dataService: DataService,
    public storageService: LocalStorageService) {
    this.geohash = this.route.snapshot.queryParamMap.get('geohash');
    this.searchValue = '';
    this.restaurantList = [];
    this.searchHistory = [];
    this.showHistory = true;
  }

  ngOnInit() {
    if (this.storageService.getStore('searchHistory')) {
      this.searchHistory = JSON.parse(this.storageService.getStore('searchHistory'));
    } else {
      this.searchHistory = [];
    }
  }

  setSearchStorage() {
    let history = this.storageService.getStore('searchHistory');
    if (history) {
      let checkrepeat = false;
      this.searchHistory = JSON.parse(history);
      this.searchHistory.forEach(item => {
        if (item === this.searchValue) {
          checkrepeat = true;
        }
      });
      if (!checkrepeat) {
        this.searchHistory.push(this.searchValue);
      }
    } else {
      this.searchHistory.push(this.searchValue);
    }
    this.storageService.setStore('searchHistory', this.searchHistory);
  }

  searchRestaurants(value?: string) {
    if (value) {
      this.searchValue = value;
    } else if (!this.searchValue) {
      return;
    }
    this.showHistory = false;
    this.dataService.searchRestaurant(this.geohash, this.searchValue).subscribe((res: any) => {
      this.restaurantList = res;
      this.emptyResult = res.length ? false : true;
    });
    this.setSearchStorage();
  }

  checkInput() {
    if (this.searchValue === '') {
      this.showHistory = true; // 显示历史记录
      this.restaurantList = []; // 清空搜索结果
      this.emptyResult = false; // 隐藏搜索为空提示
    }
  }

  deleteHistory(index: number) {
    this.searchHistory.splice(index, 1);
    this.storageService.setStore('searchHistory', this.searchHistory);
  }

  clearAll() {
    this.storageService.removeStore('searchHistory');
    this.searchHistory = [];
    this.restaurantList = [];
  }

  toShop(place: any) {
    this.router.navigate(['msite'], { queryParams: { geohash: place.geohash } })
  }

  back() {
    window.history.back();
  }
}
