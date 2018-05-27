import { Component, OnInit, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {
  trigger,
  style,
  animate,
  transition,
  state,
  keyframes
} from '@angular/animations';
import { DataService, LocalStorageService, TabsService, CartService, ShopService } from '../../service';
import { Tabs } from '../../class/tabs';

@IonicPage()
@Component({
  selector: 'page-shop',
  templateUrl: 'shop.html',
  animations: [
    trigger('cartListState', [
      transition(':enter', [
        style({ transform: 'translateY(100%)' }),
        animate(300)
      ]),
      transition(':leave', [
        animate(300, style({ transform: 'translateY(100%)' }))
      ])
    ]),
    trigger('flyInCart', [
      transition('void => *', animate('100ms ease-in'))
    ])
  ]
})
export class ShopPage extends Tabs implements OnInit {
  geohash: string = ''; // geohash位置信息
  shopId: any; // 商店id值
  showLoading: boolean = true; // 显示加载动画
  changeShowType: string = 'food'; // 切换显示商品或者评价
  shopDetailData: any; // 商铺详情
  showActivities: boolean = false; // 是否显示活动详情
  menuList: any[] = []; // 食品列表
  menuIndex: number = 0; // 已选菜单索引值，默认为0
  menuFood: any;
  shopListTop: any[] = []; // 商品列表的高度集合
  TitleDetailIndex: any; // 点击展示列表头部详情
  categoryNum: any[] = []; // 商品类型右上角已加入购物车的数量
  totalPrice: any = 0; // 总共价格
  cartFoodList: any[] = []; // 购物车商品列表
  showCartList: boolean = false; // 显示购物车列表
  receiveInCart: boolean = false; // 购物车组件下落的圆点是否到达目标位置
  preventRepeatRequest: boolean = false; //  防止多次触发数据请求
  ratingScoresData: any; // 评价总体分数
  foodScroll: any;  // 食品列表scroll
  showSpecs: boolean = false; // 控制显示食品规格
  specsIndex: number = 0; // 当前选中的规格索引值
  choosedFoods: any; // 当前选中视频数据
  showDeleteTip: boolean = false; // 多规格商品点击减按钮，弹出提示框
  showMoveDot: any[] = []; // 控制下落的小圆点显示隐藏
  windowHeight: any; // 屏幕的高度
  elLeft: number = 0; // 当前点击加按钮在网页中的绝对top值
  elBottom: number = 0; // 当前点击加按钮在网页中的绝对left值
  ratingScroll: any; // 评论页Scroll
  imgBaseUrl: string = 'http://cangdu.org:8001/img/';
  promotionInfo: string;
  shopCart: any;
  cartState: any = 'inactive';
  scrollContent: any;
  items: any[] = [];
  constructor(public navCtrl: NavController,
    public tabsService: TabsService,
    public dataService: DataService,
    public navParams: NavParams,
    public localStorageService: LocalStorageService,
    public cartService: CartService,
    public shopService: ShopService,
    public el: ElementRef) {
    super(tabsService);
    this.geohash = this.navParams.get('geohash');
    this.shopId = this.navParams.get('id');
    this.cartFoodList = [];
    this.initCart();
    this.windowHeight = window.innerHeight;
  }

  initCart() {
    let initCart = this.localStorageService.getStore('buyCart');
    if (initCart) {
      this.cartService.cartList = JSON.parse(initCart);
      this.shopCart = { ...this.cartService.cartList[this.shopId] };
    }
  }

  ngOnInit() {
    // 获取商铺信息
    this.getShopDetails();
    // 获取商铺食品列表
    this.getFoodMenu();
    // 商铺评论详情
    this.ratingScores();
    // 评论列表
    this.getRatingList(0);
  }

  initCategoryNum() {
    let newArr = [];
    let cartFoodNum = 0;
    this.totalPrice = 0;
    this.cartFoodList = [];
    this.menuList.forEach((item, index) => {
      if (this.shopCart && this.shopCart[item.foods[0].category_id]) {
        let num = 0;
        Object.keys(this.shopCart[item.foods[0].category_id]).forEach(itemid => {
          Object.keys(this.shopCart[item.foods[0].category_id][itemid]).forEach(foodid => {
            let foodItem = this.shopCart[item.foods[0].category_id][itemid][foodid];
            num += foodItem.num;
            if (item.type === 1) {
              this.totalPrice += foodItem.num * foodItem.price;
              if (foodItem.num > 0) {
                this.cartFoodList[cartFoodNum] = {};
                this.cartFoodList[cartFoodNum].category_id = item.foods[0].category_id;
                this.cartFoodList[cartFoodNum].item_id = itemid;
                this.cartFoodList[cartFoodNum].food_id = foodid;
                this.cartFoodList[cartFoodNum].num = foodItem.num;
                this.cartFoodList[cartFoodNum].price = foodItem.price;
                this.cartFoodList[cartFoodNum].name = foodItem.name;
                this.cartFoodList[cartFoodNum].specs = foodItem.specs;
                cartFoodNum++;
              }
            }
          });
        });
        newArr[index] = num;
      } else {
        newArr[index] = 0;
      }
    });
    this.totalPrice = this.totalPrice.toFixed(2);
    this.categoryNum = [...newArr];
  }

  shopCartChange() {
    this.shopCart = { ...this.cartService.cartList[this.shopId] };
    this.initCategoryNum();
  }

  getShopDetails() {
    const latitude = this.geohash.split(',')[0];
    const longitude = this.geohash.split(',')[1];
    this.dataService.getShopDetails(this.shopId, latitude, longitude).subscribe(res => {
      this.shopDetailData = res;
      this.shopService.setShopDetailData(res);
      this.promotionInfo = res.promotion_info || '欢迎光临，用餐高峰期请提前下单，谢谢。';
      this.showLoading = false;
    });
  }

  getFoodMenu() {
    this.dataService.getFoodMenu(this.shopId).subscribe(res => {
      this.menuList = res;
      this.menuFood = this.menuList[0];
      this.initCategoryNum();
    });
  }

  chooseMenu(index) {
    this.menuIndex = index;
    this.menuFood = this.menuList[index];
  }

  getRatingList(ratingOffset: number, name?: string) {
    this.dataService.getRatingList(this.shopId, ratingOffset, name).subscribe(res => {
      this.shopService.setRatingList(res);
    });
  }

  ratingScores() {
    this.dataService.getRatingScores(this.shopId).subscribe(res => {
      this.ratingScoresData = res;
      this.shopService.setRatingScoresData(res);
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
    const url = '/' + path.substr(0, 1) + '/' + path.substr(1, 2) + '/' + path.substr(3) + suffix;
    return 'https://fuss10.elemecdn.com' + url;
  }

  minimumOrderAmount() {
    if (this.shopDetailData) {
      return this.shopDetailData.float_minimum_order_amount - this.totalPrice;
    } else {
      return null;
    }
  }

  // 购物车中总共商品的数量
  totalNum() {
    let num = 0;
    this.cartFoodList.forEach(item => {
      num += item.num;
    });
    return num;
  }

  deliveryFee() {
    if (this.shopDetailData) {
      return this.shopDetailData.float_delivery_fee;
    } else {
      return null;
    }
  }
  toggleCartList() {
    this.showCartList = !this.showCartList;
  }

  onShowChooseList(foods?: any) {
    if (foods) {
      this.choosedFoods = foods;
    }
    this.showSpecs = !this.showSpecs;
    this.specsIndex = 0;
  }

  chooseSpecs(index) {
    this.specsIndex = index;
  }

  addSpecs(category_id, item_id, food_id, name, price, specs, packing_fee, sku_id, stock) {
    this.cartService.addCart({ shopid: this.shopId, category_id, item_id, food_id, name, price, specs, packing_fee, sku_id, stock });
    this.onShowChooseList();
  }

  // 加入购物车，所需7个参数，商铺id，食品分类id，食品id，食品规格id，食品名字，食品价格，食品规格
  addToCart(category_id, item_id, food_id, name, price, specs) {
    this.cartService.addCart({ shopid: this.shopId, category_id, item_id, food_id, name, price, specs });
    this.initCategoryNum();
  }
  // 移出购物车，所需7个参数，商铺id，食品分类id，食品id，食品规格id，食品名字，食品价格，食品规格
  removeOutCart(category_id, item_id, food_id, name, price, specs) {
    this.cartService.reduceCart({ shopid: this.shopId, category_id, item_id, food_id, name, price, specs });
    this.initCategoryNum();
    if (!this.cartFoodList.length) {
      this.showCartList = false;
    }
  }

  clearCart() {
    this.toggleCartList();
    this.cartService.clearCart(this.shopId);
    this.shopCartChange();
  }

  onShowMoveDot(event) {
    this.showMoveDot = event.showMoveDot;
    this.elLeft = event.elLeft;
    this.elBottom = event.elBottom;
  }

  animationStarted(event) {
    let el = event.element;
    el.style.transform = `translate3d(0,${37 + this.elBottom - this.windowHeight}px,0)`;
    el.children[0].style.transform = `translate3d(${this.elLeft - 30}px,0,0)`;
    el.children[0].style.opacity = 0;
  }
  animationDone(event) {
    let el = event.element;
    el.style.transform = `translate3d(0,0,0)`;
    el.children[0].style.transform = `translate3d(0,0,0)`;
    el.style.transition = 'transform .55s cubic-bezier(0.3, -0.25, 0.7, -0.15)';
    el.children[0].style.transition = 'transform .55s linear';
    el.children[0].style.opacity = 1;
    el.children[0].addEventListener('transitionend', () => {
      this.listenInCart();
    });
    el.children[0].addEventListener('webkitAnimationEnd', () => {
      this.listenInCart();
    });

  }
  // 监听圆点是否进入购物车
  listenInCart() {
    if (!this.receiveInCart) {
      this.receiveInCart = true;
      let el = this.el.nativeElement.getElementsByClassName('cart_icon_container')[0];
      el.addEventListener('animationend', () => {
        this.receiveInCart = false;
        this.showMoveDot = this.showMoveDot.map(item => false);
      });
      el.addEventListener('webkitAnimationEnd', () => {
        this.receiveInCart = false;
        this.showMoveDot = this.showMoveDot.map(item => false);
      });
    }
  }
}
