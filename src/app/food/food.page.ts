import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService, } from '../service';

@Component({
  selector: 'page-food',
  templateUrl: 'food.page.html',
  styleUrls: ['food.page.scss']
})
export class FoodPage implements OnInit {
  geohash: string;
  headTitle: string;
  restaurantCategoryId: string;
  restaurantCategoryIds: string;
  shopList: any[];
  latitude: string;
  longitude: string;
  category: any;
  categoryDetail: any;
  Delivery: any;
  Activity: any;
  supportIds: any[];
  sortBy: string;
  sortByType: string;
  foodTitle: string;
  filterNum: number;
  deliveryMode: string;
  offset: number;
  touchend: boolean;
  showLoading: boolean;
  preventRepeatReuqest: boolean = false; // 到达底部加载数据，防止重复加载
  dtPullToRefreshStyle = { height: 'calc(100% - 2.67rem - 45px)' };

  constructor(
    public route: ActivatedRoute,
    public dataService: DataService) {
    this.geohash = this.route.snapshot.queryParamMap.get('geohash');
    this.headTitle = this.route.snapshot.queryParamMap.get('title');
    this.restaurantCategoryId = this.route.snapshot.queryParamMap.get('restaurant_category_id');
    this.offset = 0;
    this.shopList = [];
    this.touchend = false;
    this.showLoading = true;
    this.supportIds = [];
  }

  ngOnInit() {
    this.foodTitle = this.headTitle;
    this.latitude = this.geohash.split(',')[0];
    this.longitude = this.geohash.split(',')[1];
    this.getFoodCategory();
    this.getFoodDelivery();
    this.getFoodActivity();
    this.getShopList();
  }

  getFoodCategory() {
    this.dataService.getFoodCategory(this.latitude, this.longitude).subscribe(res => {
      this.category = res;
      this.category.forEach(item => {
        if (this.restaurantCategoryId === item.id) {
          this.categoryDetail = item.sub_categories;
        }
      });
    });
  }

  getFoodDelivery() {
    this.dataService.getFoodDelivery(this.latitude, this.longitude).subscribe(res => {
      this.Delivery = res;
    });
  }

  getFoodActivity() {
    this.dataService.getFoodActivity(this.latitude, this.longitude).subscribe(res => {
      this.Activity = res;
      this.Activity.forEach((item, index) => {
        this.supportIds[index] = { status: false, id: item.id };
      });
    });
  }

  getShopList(loaderMore?: boolean) {
    this.showLoading = true;
    this.dataService.getShopList(this.latitude,
      this.longitude,
      this.offset,
      this.restaurantCategoryId,
      this.restaurantCategoryIds,
      this.sortByType,
      this.deliveryMode,
      this.supportIds).subscribe(res => {
        if (res.length < 20) {
          this.touchend = true;
        }
        if (loaderMore) {
          this.shopList = [...this.shopList, ...res];
        } else {
          this.shopList = [...res];
        }
        this.showLoading = false;
        this.preventRepeatReuqest = false;
      });
  }

  getImgPath(path) {
    let suffix;
    if (!path) {
      return 'http://test.fe.ptdev.cn/elm/elmlogo.jpeg';
    }
    if (path.indexOf('jpeg') !== -1) {
      suffix = '.jpeg';
    } else {
      suffix = '.png';
    }
    let url = '/' + path.substr(0, 1) + '/' + path.substr(1, 2) + '/' + path.substr(3) + suffix;
    return 'https://fuss10.elemecdn.com' + url;
  }

  chooseType(type) {
    if (this.sortBy !== type) {
      this.sortBy = type;
      // food选项中头部标题发生改变，需要特殊处理
      if (type === 'food') {
        this.foodTitle = '分类';
      } else {
        // 将foodTitle 和 headTitle 进行同步
        this.foodTitle = this.headTitle;
      }
    } else {
      // 再次点击相同选项时收回列表
      this.sortBy = '';
      if (type === 'food') {
        // 将foodTitle 和 headTitle 进行同步
        this.foodTitle = this.headTitle;
      }
    }
  }
  // 选中Category左侧列表的某个选项时，右侧渲染相应的sub_categories列表
  selectCategoryName(id, index) {
    // 第一个选项 -- 全部商家 因为没有自己的列表，所以点击则默认获取选所有数据
    if (index === 0) {
      this.restaurantCategoryIds = null;
      this.sortBy = '';
      // 不是第一个选项时，右侧展示其子级sub_categories的列表
    } else {
      this.restaurantCategoryId = id;
      this.categoryDetail = this.category[index].sub_categories;
    }
  }
  // 选中Category右侧列表的某个选项时，进行筛选，重新获取数据并渲染
  getCategoryIds(id, name) {
    this.restaurantCategoryIds = id;
    this.sortBy = '';
    this.foodTitle = this.headTitle = name;
    this.offset = 0;
    this.getShopList();

  }
  // 点击某个排序方式，获取事件对象的data值，并根据获取的值重新获取数据渲染
  sortList(event) {
    let node;
    //  如果点击的是 span 中的文字，则需要获取到 span 的父标签 p
    if (event.target.nodeName.toUpperCase() !== 'P') {
      node = event.target.parentNode;
    } else {
      node = event.target;
    }
    this.sortByType = node.getAttribute('data');
    this.sortBy = '';
    this.offset = 0;
    this.getShopList();
  }
  // 筛选选项中的配送方式选择
  selectDeliveryMode(id) {
    // deliveryMode为空时，选中当前项，并且filterNum加一
    if (this.deliveryMode === null) {
      this.filterNum++;
      this.deliveryMode = id;
      // deliveryMode为当前已有值时，清空所选项，并且filterNum减一
    } else if (this.deliveryMode === id) {
      this.filterNum--;
      this.deliveryMode = null;
      // deliveryMode已有值且不等于当前选择值，则赋值deliveryMode为当前所选id
    } else {
      this.deliveryMode = id;
    }
  }
  // 点击商家活动，状态取反
  selectSupportIds(index, id) {
    // 数组替换新的值
    this.supportIds.splice(index, 1, { status: !this.supportIds[index].status, id });
    // 重新计算filterNum的个数
    this.filterNum = this.deliveryMode ? 1 : 0;
    this.supportIds.forEach(item => {
      if (item.status) {
        this.filterNum++;
      }
    });
  }
  // 只有点击清空按钮才清空数据，否则一直保持原有状态
  clearSelect() {
    this.supportIds.map(item => item.status = false);
    this.filterNum = 0;
    this.deliveryMode = null;
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
    this.getShopList(true);
  }

  test() {
    history.back();
  }
}
