/**
* Created by bavv on 26/06/2020
* Copyright (c) 2020 bavv
*/

import { Platform } from 'react-native';
import { _global } from '../core/global';
import { API_URL } from './config';
import * as API from './api';
import { showLoading, hideLoading } from '../redux/actions/config';
import { isJSON } from '../core/utils';

const selectorToken = state => state.config.token;

type OPTIONS = {
  dontShowLoading?: Boolean;
  dontShowNotifi?: Boolean;
  timeout?: Number;
}

class Connection {
  static init(store) {
    const connect = new Connection(store);
    _global.connection = connect;
    console.log(`init Connection done`);
  }

  constructor(store) {
    this._store = store;
    this._store.subscribe(this._listenerChange);
    this._currentToken = undefined;
  }

  //Listen store change state
  _listenerChange = () => {
    let token = selectorToken(this._store.getState());

    if (this._currentToken !== token) {
      this._currentToken = token
    }
  }

  _POST(url, data, option, token, formData) {
    const { dontShowLoading, dontShowNotifi } = option || {};

    if (!dontShowLoading) {
      this._store.dispatch(showLoading());
    }

    return new Promise((resolve, reject) => {
      API.POST(url, data, token || this._currentToken, option, formData)
        .then(response => {
          if (!dontShowLoading) {
            this._store.dispatch(hideLoading());
          }
          console.log(`_POST response::`, response);
          if (typeof response === "string") {
            reject(response);
            if (!dontShowNotifi) {
              const json = JSON.parse(response);
              const msgError = json && json.message || response;
              _global.Alert.alert({
                title: 'Thông báo',
                message: msgError,
                leftButton: { text: 'OK' }
              });
            }
          } else if (typeof response === "boolean") {
            resolve({ success: response });
          } else {
            resolve(response);
          }
        }).catch(error => {
          _global.Alert.alert({
            title: 'Thông báo',
            message: error.message,
            leftButton: { text: 'OK' }
          });
          this._store.dispatch(hideLoading());
          reject(error)
        })
    })
  }

  _PUT(url, data, option) {
    const { dontShowLoading, dontShowNotifi } = option || {};

    if (!dontShowLoading) {
      this._store.dispatch(showLoading());
    }

    return new Promise((resolve, reject) => {
      API.PUT(url, data, this._currentToken, option)
        .then(response => {
          if (!dontShowLoading) {
            this._store.dispatch(hideLoading());
          }
          console.log(`_PUT response::`, response);
          if (typeof response === "string") {
            reject(response);
            if (!dontShowNotifi) {
              const json = JSON.parse(response);
              const msgError = json && json.message || response;
              _global.Alert.alert({
                title: 'Thông báo',
                message: msgError,
                leftButton: { text: 'OK' }
              });
            }
          } else if (typeof response === "boolean") {
            resolve({ success: response });
          } else {
            resolve(response);
          }
        }).catch(error => {
          _global.Alert.alert({
            title: 'Thông báo',
            message: error.message,
            leftButton: { text: 'OK' }
          });
          this._store.dispatch(hideLoading());
          reject(error)
        })
    })
  }

  _DELETE(url, data, option) {
    const { dontShowLoading, dontShowNotifi } = option || {};

    if (!dontShowLoading) {
      this._store.dispatch(showLoading());
    }

    return new Promise((resolve, reject) => {
      API.DELETE(url, data, this._currentToken, option)
        .then(response => {
          if (!dontShowLoading) {
            this._store.dispatch(hideLoading());
          }
          console.log(`_DELETE response::`, response);
          if (typeof response === "string") {
            reject(response);
            if (!dontShowNotifi) {
              const json = JSON.parse(response);
              const msgError = json && json.message || response;
              _global.Alert.alert({
                title: 'Thông báo',
                message: msgError,
                leftButton: { text: 'OK' }
              });
            }
          } else if (typeof response === "boolean") {
            resolve({ success: response });
          } else {
            resolve(response);
          }
        }).catch(error => {
          _global.Alert.alert({
            title: 'Thông báo',
            message: error.message,
            leftButton: { text: 'OK' }
          });
          this._store.dispatch(hideLoading());
          reject(error)
        })
    })
  }

  _GET(url, data, option) {
    const { dontShowLoading, dontShowNotifi } = option || {};

    if (!dontShowLoading) {
      this._store.dispatch(showLoading());
    }

    return new Promise((resolve, reject) => {
      API.GET(url, data, this._currentToken, option)
        .then(response => {
          if (!dontShowLoading) {
            this._store.dispatch(hideLoading());
          }
          console.log(`_GET response::`, response);
          if (typeof response === "string") {
            reject(response);
            if (!dontShowNotifi) {
              const json = JSON.parse(response);
              const msgError = json && json.message || response;
              _global.Alert.alert({
                title: 'Thông báo',
                message: msgError,
                leftButton: { text: 'OK' }
              });
            }
          } else {
            resolve(response);
          }
        }).catch(error => {
          _global.Alert.alert({
            title: 'Thông báo',
            message: error.message,
            leftButton: { text: 'OK' }
          });
          this._store.dispatch(hideLoading());
          reject(error);
        })
    })
  }

  login(data, option) {
    return this._POST(API_URL.login, data, option);
  }

  loginSocial(data, option) {
    return this._POST(API_URL.loginSocial, data, option);
  }

  register(data, option) {
    return this._POST(API_URL.register, data, option);
  }
  resetPassword(data, option) {
    return this._PUT(API_URL.resetPassword, data, option);
  }

  getProfile(data, option) {
    return this._GET(API_URL.getProfile, data, option);
  }

  // store
  getAllStore(data, option) {

  }

  // Product
  getProducts(data, option) {
    // let { isHot, isNew, isPromotion, categoryId, limit = 20, page = 1, searchValue, sort } = data;
    return this._GET(API_URL.getProducts, data, option);
  }

  getProductDetail(data, option) {
    return this._GET(`${API_URL.getProductDetail}/${data.productId}/wishlist`, null, option);
  }

  getMyWishlist(data, option) {
    return this._GET(API_URL.getMyWishlist, data, option);
  }

  addToWishlist(data, option) {
    return this._POST(API_URL.addToWishlist, data, option);
  }

  removeFromWishlist(data, option) {
    return this._DELETE(`${API_URL.removeFromWishlist}/${data.productId}`, null, option);
  }

  // category
  getCategories(data, option) {
    return this._GET(API_URL.getCategories, data, option);
  }
  getChildCategories(data, option) {
    return this._GET(`${API_URL.getChildCategories}/${data.categoryId}/child`, data, option);
  }

  // cart
  getMyCart(data, option) {
    return this._GET(API_URL.getMyCart, data, option);
  }

  addToCart(data, option) {
    return this._POST(API_URL.addToCart, data, option);
  }

  removeItemFromCart(data, option) {
    return this._DELETE(`${API_URL.removeItemFromCart}/${data.itemId}`, null, option);
  }

  clearDisabledItemFromCart(data, option) {
    return this._DELETE(API_URL.clearDisabledItemFromCart, null, option);
  }

  changeQuantityItemInCart(data, option) {
    return this._PUT(`${API_URL.changeQuantityItemInCart}/${data.productId}`, data, option);
  }

  // order
  getOrder(data, option) {
    return this._GET(API_URL.getOrder, data, option);
  }

  getOrderOfStore(data, option) {
    return this._GET(API_URL.getOrderOfStore, data, option);
  }

  createOrder(data, option) {
    return this._POST(API_URL.createOrder, data, option);
  }

  getOrderDetail(data, option) {
    return this._GET(`${API_URL.getOrderDetail}/${data.orderId}`, null, option);
  }

  cancelOrder(data, option) {
    return this._DELETE(`${API_URL.cancelOrder}/${data.orderId}`, null, option);
  }

  cancelItemInOrder(data, option) {
    return this._DELETE(`${API_URL.cancelItemInOrder}/${data.orderItemId}`, null, option);
  }

  // location
  getCity(data, option) {
    return this._GET(API_URL.getCity, data, option);
  }
  getDistrict(data, option) {
    return this._GET(API_URL.getDistrict, data, option);
  }
  getWard(data, option) {
    return this._GET(API_URL.getWard, data, option);
  }
  getMyShippingAddress(data, option) {
    return this._GET(API_URL.getMyShippingAddress, data, option);
  }
  addMyShippingAddress(data, option) {
    return this._POST(API_URL.addMyShippingAddress, data, option);
  }

  //Notification
  subcribeNotification(data, option) {
    return this._POST(`${API_URL.subcribeNotification}/${data.device_token}`, null, option)
  }
  unsubcribeNotification(data, option) {
    return this._DELETE(`${API_URL.unsubcribeNotification}/${data.device_token}`, null, option)
  }
  getNotification(data, option) {
    return this._GET(API_URL.getNotification, data, option);
  }

  // Product
  getLivestream(data, option) {
    // let { name, limit = 20, page = 1, searchValue, sort } = data;
    return this._GET(API_URL.getLivestreamAllStore, data, option);
  }

  getLivestreamDetail(data, option) {
    return this._GET(`${API_URL.getLivestreamDetail}/${data.livestreamId}`, null, option);
  }

  getProductOfLivestream(data, option) {
    // let { livestreamId, limit = 20, page = 1, searchValue, sort } = data;
    const url = `${API_URL.getProductOfLivestream}/${data.livestreamId}/products`;
    delete data.livestreamId;
    return this._GET(url, data, option);
  }

  // store
  getStoreById(data, option) {
    return this._GET(`${API_URL.getStoreById}/${data.storeId}`, null, option);
  }

  // banner
  getBanner(data, option) {
    return this._GET(API_URL.getBanner, data, option);
  }

  // flag
  getFlag(data, option) {
    return this._GET(API_URL.getFlag, data, option);
  }

}

module.exports = Connection;
