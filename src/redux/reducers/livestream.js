/**
* Created by bavv on 26/06/2020
* Copyright (c) 2020 bavv
*/

import * as types from '../types';

const initialState = {
  loading: false,
  livestreams: {
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
  livestreamDetail: {
  }
};

export default function config(state = initialState, action) {
  switch (action.type) {
    case types.GET_LIVESTREAM:
      return {
        ...state,
        livestreams: { ...state.livestreams, loading: true },
        loading: true
      }
    case types.GET_LIVESTREAM_SUCCESS:
      return {
        ...state,
        livestreams: {
          page: action.payload.page,
          limit: action.payload.limit,
          totalPage: action.payload.totalPage,
          data: action.payload.rows,
          loading: false,
          loadMore: false
        },
        loading: false
      }
    case types.GET_LIVESTREAM_DETAIL:
      return {
        ...state,
        livestreamDetail: state.livestreamDetail,
        loading: true
      }
    case types.GET_LIVESTREAM_DETAIL_SUCCESS:
      return {
        ...state,
        livestreamDetail: action.payload,
        loading: false
      }
    case types.GET_PRODUCT_OF_LIVESTREAM:
      return {
        ...state,
        products: { ...state.products, loading: true },
        loading: true
      }
    case types.GET_PRODUCT_OF_LIVESTREAM_SUCCESS:
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
    default:
      return state
  }
}
