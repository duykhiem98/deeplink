/**
* Created by bavv on 26/06/2020
* Copyright (c) 2020 bavv
*/

import * as types from '../types';

const initialState = {
  loading: false,
  categories: {
    data: [],
    page: 1,
    limit: 20,
    totalPage: undefined,
    count: undefined,
    loading: false,
    loadMore: false
  },
  products: {
    data: [],
    page: 1,
    limit: 20,
    totalPage: undefined,
    count: undefined,
    loading: false,
    loadMore: false
  },
  productDetail: {
    data: {},
    loading: false
  },
  variantSelected: [],
};

export default function config(state = initialState, action) {
  switch (action.type) {
    case types.RESET_PRODUCT_SCREEN:
      return {
        ...initialState,
      }
    case types.GET_CATEGORY:
      return {
        ...state,
        categories: { ...state.categories, loading: true, loadMore: true },
        loading: true
      }
    case types.GET_CATEGORY_SUCCESS:
      return {
        ...state,
        categories: {
          data: [...state.categories.data, ...action.payload],
          loading: false,
          loadMore: false
        },
        loading: false
      }
    case types.GET_PRODUCT:
      return {
        ...state,
        products: { ...state.products, loading: true, loadMore: true },
        loading: true
      }
    case types.GET_PRODUCT_SUCCESS:
      return {
        ...state,
        products: {
          page: action.payload.page,
          limit: action.payload.limit,
          totalPage: action.payload.totalPage,
          data: [...state.products.data, ...action.payload.rows],
          loading: false,
          loadMore: false
        },
        loading: false
      }
    case types.GET_PRODUCT_DETAIL:
      return {
        ...state,
        productDetail: { ...state.productDetail, loading: true },
        loading: true
      }
    case types.GET_PRODUCT_DETAIL_SUCCESS:
      return {
        ...state,
        productDetail: {
          data: action.payload,
          loading: false
        },
        loading: false
      }
    case types.GET_PRODUCT_DETAIL_FAILED:
      return {
        ...state,
        productDetail: { ...state.productDetail, loading: false },
        loading: false
      }
    case types.SELECT_VARIANT:
      return {
        ...state,
        variantSelected: state.variantSelected.find(e => e.code === action.payload.code) ? [...state.variantSelected.filter(e => e.code !== action.payload.code), action.payload] : [...state.variantSelected, action.payload],
        loading: false
      }
    case types.REMOVE_VARIANT:
      return {
        ...state,
        variantSelected: state.variantSelected.filter(e => e.code !== action.payload.code),
        loading: false
      }
    case types.RESET_VARIANT:
      return {
        ...state,
        variantSelected: [],
        loading: false
      }
    case types.UPDATE_WISHLIST:
      return {
        ...state,
        products: {
          ...state.products,
          data: state.products.data.map(dt => dt.id === action.payload.id ? { ...dt, isWishlist: action.payload.isWishlist, favoriteCount: action.payload.isWishlist ? dt.favoriteCount + 1 : dt.favoriteCount - 1 } : dt),
        },
        productDetail: {
          data: {
            ...state.productDetail.data,
            isWishlist: state.productDetail.data.id === action.payload.id ? action.payload.isWishlist : state.productDetail.data.isWishlist,
            favoriteCount: action.payload.isWishlist ? state.productDetail.data.favoriteCount + 1 : state.productDetail.data.favoriteCount - 1
          },
          loading: false
        },
        loading: false
      }
    default:
      return state
  }
}