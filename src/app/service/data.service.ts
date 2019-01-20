import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()

export class DataService {
  constructor(private http: HttpClient) { }

  getCity(type: string): any {
    return this.http.get('/v1/cities' + `?type=${type}`);
  }

  getGuessCity(): any {
    return this.getCity('guess');
  }

  getHotCity(): any {
    return this.getCity('hot');
  }

  getGroupCity(): any {
    return this.getCity('group').pipe(
      map(res => {
        let sortCities = [];
        for (let i = 65; i <= 90; i++) {
          if (res[String.fromCharCode(i)]) {
            sortCities.push({ letter: String.fromCharCode(i), cities: res[String.fromCharCode(i)] });
          }
        }
        return sortCities;
      })
    );
  }

  getCityById(id: string): any {
    return this.http.get('/v1/cities' + `/${id}`);
  }

  searchPlace(cityId: string, keyword: string): any {
    //  HttpParams是一个不可变对象，每次set都会返回一个新的对象，所以需要链式调用
    let params = new HttpParams()
      .set('type', 'search')
      .set('city_id', cityId)
      .set('keyword', keyword);
    return this.http.get('/v1/pois', { params: params });
  }

  getPoisGeohash(geohash: string): any {
    return this.http.get('/v2/pois' + `/${geohash}`);
  }

  getMsiteFoodTypes(geohash: string): any {
    let params = new HttpParams()
      .set('geohash', geohash)
      .set('group_type', '1')
      .set('flags[]', 'F');
    return this.http.get('/v2/index_entry', { params: params });
  }

  searchRestaurant(geohash: string, searchValue: string): any {
    let params = new HttpParams()
      .set('extras[]', 'restaurant_activity')
      .set('geohash', geohash)
      .set('keyword', searchValue)
      .set('type', 'search');
    return this.http.get('/v4/restaurants', { params: params });
  }

  getShopList(latitude, longitude, offset, restaurantCategoryId = '', restaurantCategoryIds = '', orderBy = '', deliveryMode = '', supportIds = []): any {
    let supportStr = '';
    supportIds.forEach(item => {
      if (item.status) {
        supportStr += '&support_ids[]=' + item.id;
      }
    });
    let params = new HttpParams()
      .set('latitude', latitude)
      .set('longitude', longitude)
      .set('offset', offset)
      .set('limit', '20')
      .set('extras[]', 'activities')
      .set('keyword', '')
      .set('restaurant_category_id', restaurantCategoryId)
      .set('restaurant_category_ids[]', restaurantCategoryIds)
      .set('order_by', orderBy)
      .set('delivery_mode[]', deliveryMode + supportStr)
      .set('limit', '20');
    return this.http.get('/shopping/restaurants', { params: params });
  }

  getCaptchas(): any {
    return this.http.post('/v1/captchas', {});
  }

  accountLogin(username: string, password: string, captcha_code: any): any {
    return this.http.post('/v2/login', { username, password, captcha_code });
  }

  /* 获取food页面的 category 种类列表 */

  getFoodCategory(latitude, longitude): any {
    let params = new HttpParams()
      .set('latitude', latitude)
      .set('longitude', longitude);
    return this.http.get('/shopping/v2/restaurant/category', { params: params });
  }

  /*  获取food页面的配送方式 */

  getFoodDelivery(latitude, longitude): any {
    let params = new HttpParams()
      .set('latitude', latitude)
      .set('longitude', longitude)
      .set('kw', '');
    return this.http.get('/shopping/v1/restaurants/delivery_modes', { params: params });
  }


  /* 获取food页面的商家属性活动列表 */

  getFoodActivity(latitude, longitude): any {
    let params = new HttpParams()
      .set('latitude', latitude)
      .set('longitude', longitude)
      .set('kw', '');
    return this.http.get('/shopping/v1/restaurants/activity_attributes', { params: params });
  }

  /* 获取shop页面商铺详情 */
  getShopDetails(shopId: string, latitude: string, longitude: string): any {
    let params = new HttpParams()
      .set('latitude', latitude)
      .set('longitude', longitude + '&extras[]=activities&extras[]=album&extras[]=license&extras[]=identification&extras[]=statistics');
    return this.http.get('/shopping/restaurant/' + shopId, { params: params });
  }
  /* 获取shop页面菜单列表 */
  getFoodMenu(restaurantId): any {
    let params = new HttpParams()
      .set('restaurant_id', restaurantId);
    return this.http.get('/shopping/v2/menu', { params: params });
  }

  /* 获取商铺评价列表 */
  getRatingList(shopId: string, offset: any, tagName = ''): any {
    let params = new HttpParams()
      .set('has_content', 'true')
      .set('offset', offset)
      .set('limit', '10')
      .set('tag_name', tagName);
    return this.http.get('/ugc/v2/restaurants/' + shopId + '/ratings', { params: params });
  }

  /* 获取商铺评价分数 */
  getRatingScores(shopId: string): any {
    return this.http.get('/ugc/v2/restaurants/' + shopId + '/ratings/scores');
  }

  /* 获取商铺评价分类 */
  ratingTags(shopId: string): any {
    return this.http.get('/ugc/v2/restaurants/' + shopId + '/ratings/tags');
  }

  /*  获取快速备注列表 */
  getRemark(id: string, sig: string): any {
    let params = new HttpParams()
      .set('sig', sig);
    return this.http.get('/v1/carts/' + id + '/remarks', { params: params });
  }

  /* 个人中心里编辑地址 */
  getAddressList(userId: string): any {
    return this.http.get('/v1/users/' + userId + '/addresses');
  }

  /* 添加地址 */
  postAddAddress(userId, address, address_detail, geohash, name, phone, phone_bk, poi_type, sex, tag, tag_type): any {
    let body = {
      address,
      address_detail,
      geohash,
      name,
      phone,
      phone_bk,
      poi_type,
      sex,
      tag,
      tag_type,
    };
    return this.http.post('/v1/users/' + userId + '/addresses', body);
  }

  /* 搜索地址 */
  searchNearby(keyword: string): any {
    let params = new HttpParams()
      .set('type', 'nearby')
      .set('keyword', keyword);
    return this.http.get('/v1/pois', { params: params });
  }

  /* 确认订单 */
  checkout(geohash, entities, shopId): any {
    let body = { 'come_from': 'web', 'geohash': geohash, 'entities': entities, 'restaurant_id': shopId };
    return this.http.post('/v1/carts/checkout', body);
  }

  /* 下订单 */
  placeOrders(userId, cartId, addressId, description, entities, geohash, sig): any {
    let body = {
      address_id: addressId,
      come_from: 'mobile_web',
      deliver_time: '',
      description,
      entities,
      geohash,
      paymethod_id: 1,
      sig,
    };
    return this.http.post('/v1/users/' + userId + '/carts/' + cartId + '/orders', body);
  }

  /* 获取订单列表 */
  getOrderList(userId, offset): any {
    let params = new HttpParams()
      .set('limit', '10')
      .set('offset', offset);
    return this.http.get('/bos/v2/users/' + userId + '/orders', { params: params });
  }
  /* 获取订单详情 */
  getOrderDetail(userId, orderId): any {
    return this.http.get('/bos/v1/users/' + userId + '/orders/' + orderId + '/snapshot');
  }

  getUserInfo(userId: string): any {
    let params = new HttpParams()
      .set('user_id', userId);
    return this.http.get('/v1/user', { params: params });
  }

  /**
 * 重新发送订单验证码
 */

  getPayRequest(merchantOrderNo, userId): any {
    let params = new HttpParams()
      .set('merchantId', '5')
      .set('merchantOrderNo', merchantOrderNo)
      .set('source', 'MOBILE_WAP')
      .set('userId', userId)
      .set('version', '1.0.0');
    return this.http.get('/payapi/payment/queryOrder', { params: params });
  }

}

