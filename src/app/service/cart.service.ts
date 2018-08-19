import { Injectable } from '@angular/core';
import { LocalStorageService } from './localstorage.service';

@Injectable()

export class CartService {
  public cartList: Object;
  constructor(public storageService: LocalStorageService) {
    this.cartList = {};
  }

  //  加入购物车
  addCart(cartObject: {
    shopid?: string,
    category_id?: string,
    item_id?: string,
    food_id?: string,
    name?: string,
    price?: any,
    specs?: any,
    packing_fee?: any,
    sku_id?: string,
    stock?: any
  }) {
    let cart = this.cartList;
    let shop = cart[cartObject.shopid] = (cart[cartObject.shopid] || {});
    let category = shop[cartObject.category_id] = (shop[cartObject.category_id] || {});
    let item = category[cartObject.item_id] = (category[cartObject.item_id] || {});
    if (item[cartObject.food_id]) {
      item[cartObject.food_id]['num']++;
    } else {
      item[cartObject.food_id] = {
        'num': 1,
        'id': cartObject.food_id,
        'name': cartObject.name,
        'price': cartObject.price,
        'specs': cartObject.specs,
        'packing_fee': cartObject.packing_fee,
        'sku_id': cartObject.sku_id,
        'stock': cartObject.stock
      };
    }
    this.cartList = { ...cart };
    // 存入localStorage
    this.storageService.setStore('buyCart', this.cartList);
  }
  //  移出购物车
  reduceCart(cartObject: {
    shopid?: string,
    category_id?: string,
    item_id?: string,
    food_id?: string,
    name?: string,
    price?: any,
    specs?: any,
    packing_fee?: any,
    sku_id?: string,
    stock?: any
  }) {
    let cart = this.cartList;
    let shop = (cart[cartObject.shopid] || {});
    let category = (shop[cartObject.category_id] || {});
    let item = (category[cartObject.item_id] || {});
    if (item && item[cartObject.food_id]) {
      if (item[cartObject.food_id]['num'] > 0) {
        item[cartObject.food_id]['num']--;
        this.cartList = { ...cart };
        // 存入localStorage
        this.storageService.setStore('buyCart', this.cartList);
      } else {
        // 商品数量为0，则清空当前商品的信息
        item[cartObject.food_id] = null;
      }
    }
  }
  // 网页初始化时从本地缓存获取购物车数据
  initBuyCart() {
    let initCart = this.storageService.getStore('buyCart');
    if (initCart) {
      this.cartList = JSON.parse(initCart);
    }
  }
  // 清空当前商品的购物车信息
  clearCart(shopId) {
    this.cartList[shopId] = null;
    this.cartList = { ...this.cartList };
    this.storageService.setStore('buyCart', this.cartList);
  }
}
