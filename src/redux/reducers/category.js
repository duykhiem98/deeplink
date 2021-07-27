/**
* Created by bavv on 26/06/2020
* Copyright (c) 2020 bavv
*/

import * as types from '../types';

const initialState = {
  loading: false,
  childCategories: [],
  products: {
    data: [],
    page: 1,
    limit: 20,
    totalPage: undefined,
    count: undefined,
    loading: false,
    loadMore: false
  },
  productsRelate: {
    data: [],
    page: 1,
    limit: 20,
    totalPage: undefined,
    count: undefined,
    loading: false,
    loadMore: false
  },
};

export default function config(state = initialState, action) {
  console.log(`category action:`, action);
  switch (action.type) {
    case types.GET_CHILD_CATEGORY:
      return {
        ...state,
        childCategories: [],
        loading: true
      }
    case types.GET_CHILD_CATEGORY_SUCCESS:
      return {
        ...state,
        childCategories: action.payload,
        loading: false
      }
    case types.GET_PRODUCT_BY_CATE_ID:
      return {
        ...state,
        products: { ...state.products, loading: true },
        loading: true
      }
    case types.GET_PRODUCT_BY_CATE_ID_SUCCESS:
      return {
        ...state,
        products: {
          page: action.payload.page,
          limit: action.payload.limit,
          totalPage: action.payload.totalPage,
          data: action.payload.rows,
          loading: false,
          loadMore: false
        },
        loading: false
      }
    case types.GET_PRODUCT_RELATE_SUCCESS:
      return {
        ...state,
        productsRelate: {
          page: action.payload.page,
          limit: action.payload.limit,
          totalPage: action.payload.totalPage,
          data: action.payload.rows,
          loading: false,
          loadMore: false
        },
        loading: false
      }
    case types.UPDATE_WISHLIST:
      return {
        ...state,
        products: {
          ...state.products,
          data: state.products.data.map(dt => dt.id === action.payload.id ? { ...dt, isWishlist: action.payload.isWishlist, favoriteCount: action.payload.isWishlist ? dt.favoriteCount + 1 : dt.favoriteCount - 1 } : dt),
        },
        productsRelate: {
          ...state.productsRelate,
          data: state.productsRelate.data.map(dt => dt.id === action.payload.id ? { ...dt, isWishlist: action.payload.isWishlist, favoriteCount: action.payload.isWishlist ? dt.favoriteCount + 1 : dt.favoriteCount - 1 } : dt),
        },
        loading: false
      }
    default:
      return state
  }
}
