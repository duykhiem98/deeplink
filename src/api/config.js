/**
* Created by bavv on 26/06/2020
* Copyright (c) 2020 bavv
*/

export const API_URL = {
  // authen
  login: '/auth/app/login',
  loginSocial: '/auth/app/social-login',
  register: '/app/customers',
  resetPassword: '/app/customers-password',
  getProfile: '/app/customers/me',

  // Product
  getAttributes: '/attributes',
  getAttributesById: '/attributes/values', // ?attributeId=05d9caed-176e-433b-b97b-8e6a5b2e7fcd
  getStores: '/stores', // ?limit=20&page=1
  getCategories: '/categories/orderByProduct', // ?limit=20&page=1&storeId=db2d186c-bbd0-40e4-82d6-6cc5d04f9e61
  getChildCategories: '/categories',
  getProducts: '/products/search', // ?storeId=db2d186c-bbd0-40e4-82d6-6cc5d04f9e61&isHot=true&isNew&isPromotion&categoryId&limit=20&page=1&searchValue&sort
  getProductDetail: '/products', // /427d4d04-c2ab-47c8-9ac2-6ff3b7182e3f
  getMyWishlist: '/wishlist/mine',
  addToWishlist: '/wishlist/mine/items',
  removeFromWishlist: '/wishlist/mine/items', // {itemId}

  // Cart
  getMyCart: '/carts/mine/info',
  addToCart: '/carts/mine/items',
  removeItemFromCart: '/carts/mine/items', // {itemId}
  clearDisabledItemFromCart: '/carts/mine/items/clear',
  changeQuantityItemInCart: '/carts/mine/items',

  // Order
  getOrder: '/orders/customer',
  getOrderOfStore: '/orders/store',
  createOrder: '/orders',
  getOrderDetail: '/orders', // {orderId}
  cancelOrder: '/orders', // {orderId}
  cancelItemInOrder: '/orders/items', // {orderItemId}

  // Location
  getCity: '/location/cities',
  getDistrict: '/location/districts',
  getWard: '/location/wards',
  getMyShippingAddress: '/shipping/address/latest',
  addMyShippingAddress: '/shipping/address',

  //Notification
  subcribeNotification: '/customers/players',// {playerId}
  unsubcribeNotification: '/players',// {id}
  getNotification: '/notifications/mine',

  // Livestream
  getLivestreamAllStore: '/livestreams',
  getLivestream: '/livestreams/mine',
  getLivestreamDetail: '/livestreams', // {livestreamId}
  getProductOfLivestream: '/livestreams', // {livestreamId}/products

  // Store
  getStoreById: '/stores/id', // {storeId}}

  //banner
  getBanner: '/banners',
  //flag
  getFlag: '/flags',

  // CTV
  registerCTV: '/partner/register',
  Setting:'/ref/settings',
  CTV:'/partner/reports',
}
