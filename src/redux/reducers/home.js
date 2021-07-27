/**
* Created by bavv on 26/06/2020
* Copyright (c) 2020 bavv
*/

import * as types from '../types';

const initialState = {
  loading: false,
  lives: {
    data: [],
    page: 1,
    limit: 20,
    totalPage: undefined,
    count: undefined,
    loading: false,
    loadMore: false
  },
  newProducts: {
    data: [],
    page: 1,
    limit: 20,
    totalPage: undefined,
    count: undefined,
    loading: false,
    loadMore: false
  },
  promotionProducts: {
    data: [],
    page: 1,
    limit: 20,
    totalPage: undefined,
    count: undefined,
    loading: false,
    loadMore: false
  },
  hotProducts: {
    data: [],
    page: 1,
    limit: 20,
    totalPage: undefined,
    count: undefined,
    loading: false,
    loadMore: false
  },
  banners: [],
  flags: [],
};

export default function config(state = initialState, action) {
  switch (action.type) {
    case types.GET_HOME_PRODUCT:
      return {
        ...state,
        newProducts: { ...state.newProducts, loading: true },
        promotionProducts: { ...state.promotionProducts, loading: true },
        hotProducts: { ...state.hotProducts, loading: true },
        loading: true
      }
    case types.GET_HOME_PRODUCT_SUCCESS:
      return {
        ...state,
        newProducts: {
          page: action.payload.page,
          limit: action.payload.limit,
          totalPage: action.payload.totalPage,
          data: action.payload.rows.filter(dt => dt.salePrice >= dt.price),
          loading: false,
          loadMore: false
        },
        promotionProducts: {
          page: action.payload.page,
          limit: action.payload.limit,
          totalPage: action.payload.totalPage,
          data: action.payload.rows.filter(dt => dt.salePrice < dt.price),
          loading: false,
          loadMore: false
        },
        hotProducts: {
          page: action.payload.page,
          limit: action.payload.limit,
          totalPage: action.payload.totalPage,
          data: action.payload.rows.filter(dt => dt.isHot === true),
          loading: false,
          loadMore: false
        },
        loading: false
      }
    case types.UPDATE_WISHLIST:
      return {
        ...state,
        newProducts: {
          ...state.newProducts,
          data: state.newProducts.data.map(dt => dt.id === action.payload.id ? { ...dt, isWishlist: action.payload.isWishlist, favoriteCount: action.payload.isWishlist ? dt.favoriteCount + 1 : dt.favoriteCount - 1 } : dt),
        },
        promotionProducts: {
          ...state.promotionProducts,
          data: state.promotionProducts.data.map(dt => dt.id === action.payload.id ? { ...dt, isWishlist: action.payload.isWishlist, favoriteCount: action.payload.isWishlist ? dt.favoriteCount + 1 : dt.favoriteCount - 1 } : dt),
        },
        hotProducts: {
          ...state.hotProducts,
          data: state.hotProducts.data.map(dt => dt.id === action.payload.id ? { ...dt, isWishlist: action.payload.isWishlist, favoriteCount: action.payload.isWishlist ? dt.favoriteCount + 1 : dt.favoriteCount - 1 } : dt),
        },
        loading: false
      }
    case types.GET_BANNER_SUCCESS:
      return {
        ...state,
        banners: action.payload,
      }
    case types.GET_FLAG_SUCCESS:
      return {
        ...state,
        flags: action.payload,
      }
    default:
      return state
  }
}
