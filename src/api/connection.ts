/**
* Created by bavv on 26/06/2020
* Copyright (c) 2020 bavv
*/

type OPTIONS = {
  dontShowLoading?: Boolean;
  dontShowNotifi?: Boolean;
  timeout?: Number;
}

export class Connection {

  // login
  login(data?: { userName?: String, password: String }, option?: OPTIONS) {

  }
  // login social
  loginSocial(data?: { socialType?: String, token: String}, option?: OPTIONS) {

  }

  register(data?: { userName?: String, password: String, otp: String, referralCode: String }, option?: OPTIONS) {

  }

  resetPassword(data?: { userName?: String, password: String, otp: String }, option?: OPTIONS) {

  }

  getProfile(data?: {}, option?: OPTIONS) {

  }

  // store
  getAllStore(data?: { limit?: Number, page?: Number, sort?: Array }, option?: OPTIONS) {

  }

  // Product
  getProducts(data?: { storeId?: String, isHot?: Boolean, isNew?: Boolean, isPromotion?: Boolean, isDiscount?: Boolean, categoryId?: String, limit?: Number, page?: Number, searchValue?: String, sort?: Array }, option?: OPTIONS) {

  }

  getProductDetail(data?: { id?: String }, option?: OPTIONS) {

  }

  getMyWishlist(data?: {}, option?: OPTIONS) {

  }

  addToWishlist(data?: { productId?: String }, option?: OPTIONS) {

  }

  removeFromWishlist(data?: { productId?: String }, option?: OPTIONS) {

  }

  // category
  getCategories(data?: { limit?: Number, page?: Number, sort?: Array, storeId?: String }, option?: OPTIONS) {

  }
  getChildCategories(data?: { categoryId?: String }, option?: OPTIONS) {

  }

  // cart
  getMyCart(data?: {}, option?: OPTIONS) {

  }

  addToCart(data?: { productId?: String, quantity?: Number }, option?: OPTIONS) {

  }

  removeItemFromCart(data?: { itemId?: String }, option?: OPTIONS) {

  }

  clearDisabledItemFromCart(data?: {}, option?: OPTIONS) {

  }

  changeQuantityItemInCart(data?: { itemId?: String, quantity?: Number }, option?: OPTIONS) {

  }

  // order
  getOrder(data?: {}, option?: OPTIONS) {

  }

  getOrderOfStore(data?: {}, option?: OPTIONS) {

  }

  createOrder(data?: {}, option?: OPTIONS) {

  }

  getOrderDetail(data?: { orderId?: String }, option?: OPTIONS) {

  }

  cancelOrder(data?: { orderId?: String }, option?: OPTIONS) {

  }

  cancelItemInOrder(data?: { orderItemId?: String }, option?: OPTIONS) {

  }

  getCity(data?: {}, option?: OPTIONS) {

  }
  getDistrict(data?: { cityCode?: Number }, option?: OPTIONS) {

  }
  getWard(data?: { districtCode?: Number }, option?: OPTIONS) {

  }
  getMyShippingAddress(data?: {}, option?: OPTIONS) {

  }
  addMyShippingAddress(data?: {}, option?: OPTIONS) {

  }

  subcribeNotification(data?: { device_token?: String, app?: 'ios' | 'android' }, option?: OPTIONS) {

  }
  unsubcribeNotification(data?: { device_token?: String }, option?: OPTIONS) {

  }
  getNotification(data?: {}, option?: OPTIONS) {

  }

  // Livestream
  getLivestream(data?: { name?: String, limit?: Number, page?: Number, searchValue?: String, sort?: Array }, option?: OPTIONS) {

  }
  getLivestreamDetail(data?: { livestreamId?: String }, option?: OPTIONS) {

  }
  getProductOfLivestream(data?: { livestreamId?: String, limit?: Number, page?: Number, searchValue?: String, sort?: Array }, option?: OPTIONS) {

  }

  // store
  getStoreById(data?: { storeId?: String }, option?: OPTIONS) {

  }

  // banner
  getBanner(data?: {}, option?: OPTIONS) {

  }

  // flag
  getFlag(data?: {}, option?: OPTIONS) {

  }

}
