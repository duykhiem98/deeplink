/**
* Created by bavv on 26/06/2020
* Copyright (c) 2020 bavv
*/

import * as types from '../types';

const initialState = {
  loading: false,
  products: {
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
  switch (action.type) {
    case types.GET_PRODUCT_BY_CATE_CHILD_ID:
      return {
        ...state,
        products: { ...state.products, loading: true },
        loading: true
      }
    case types.GET_PRODUCT_BY_CATE_CHILD_ID_SUCCESS:
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
    case types.UPDATE_WISHLIST:
      return {
        ...state,
        products: {
          ...state.products,
          data: state.products.data.map(dt => dt.id === action.payload.id ? { ...dt, isWishlist: action.payload.isWishlist, favoriteCount: action.payload.isWishlist ? dt.favoriteCount + 1 : dt.favoriteCount - 1 } : dt),
        },
        loading: false
      }
    default:
      return state
  }
}
