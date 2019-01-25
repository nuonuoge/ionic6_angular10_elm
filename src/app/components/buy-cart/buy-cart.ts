import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { LocalStorageService, CartService } from '../../service';

@Component({
  selector: 'buy-cart',
  templateUrl: 'buy-cart.html',
  styleUrls: ['buy-cart.scss']
})
export class BuyCartComponent {
  @Input() foods: any;
  @Input() shopId: string;
  @Output() onCartChange: EventEmitter<any> = new EventEmitter();
  @Output() onShowChooseList: EventEmitter<any> = new EventEmitter();
  @Output() onShowMoveDot: EventEmitter<any> = new EventEmitter();
  showMoveDot: any = [];
  constructor(public storageService: LocalStorageService, public cartService: CartService, public toastCtrl: ToastController) {

  }
  shopCart() {
    return Object.assign({}, this.cartService.cartList[this.shopId]);
  }
  // shopCart变化的时候重新计算当前商品的数量
  foodNum() {
    const category_id = this.foods.category_id;
    const item_id = this.foods.item_id;
    if (this.shopCart() && this.shopCart()[category_id] && this.shopCart()[category_id][item_id]) {
      let num = 0;
      const values = [];
      Object.keys(this.shopCart()[category_id][item_id]).forEach(item => {
        values.push(this.shopCart()[category_id][item_id][item]);
      });
      values.forEach((item, index) => {
        num += item.num;
      });
      return num;
    } else {
      return 0;
    }
  }
  // 移出购物车
  removeOutCart(category_id, item_id, food_id, name, price, specs, packing_fee, sku_id, stock) {
    if (this.foodNum() > 0) {
      this.cartService.reduceCart({ shopid: this.shopId, category_id, item_id, food_id, name, price, specs, packing_fee, sku_id, stock });
      this.onCartChange.emit(null);
    }
  }
  // 加入购物车，计算按钮位置。
  addToCart(category_id, item_id, food_id, name, price, specs, packing_fee, sku_id, stock, event) {
    this.cartService.addCart({ shopid: this.shopId, category_id, item_id, food_id, name, price, specs, packing_fee, sku_id, stock });
    this.onCartChange.emit(null);
    const elLeft = event.target.getBoundingClientRect().left;
    const elBottom = event.target.getBoundingClientRect().bottom;
    this.showMoveDot.push(true);
    this.onShowMoveDot.emit({ 'showMoveDot': this.showMoveDot, 'elLeft': elLeft, 'elBottom': elBottom });

  }
  // 显示规格列表
  showChooseList(foods) {
    this.onShowChooseList.emit(foods);
  }
  // 点击多规格商品的减按钮，弹出提示
  async showReduceTip() {
    const toast = await this.toastCtrl.create({
      message: '多规格商品只能去购物车删除哦',
      duration: 2000,
      position: 'middle',
      cssClass: 'specs_reduce_tip'
    });
    toast.present();
  }
}
