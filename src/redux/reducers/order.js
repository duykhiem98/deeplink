/**
* Created by bavv on 26/06/2020
* Copyright (c) 2020 bavv
*/

import * as types from '../types';

const initialState = {
  loading: false,
  orders: {
    data: [],
    page: 1,
    limit: 20,
    totalPage: undefined,
    count: undefined,
    loading: false,
    loadMore: false
  },
  orderDetail: {}
};

export default function config(state = initialState, action) {
  switch (action.type) {
    case types.GET_ORDER:
      return {
        ...state,
        orders: { ...state.orders, loading: true },
        loading: true
      }
    case types.GET_ORDER_SUCCESS:
      return {
        ...state,
        orders: {
          page: action.payload.page,
          limit: action.payload.limit,
          totalPage: action.payload.totalPage,
          data: action.payload.rows,
          loading: false,
          loadMore: false
        },
        loading: false
      }
    case types.GET_ORDER_DETAIL:
      return {
        ...state,
        orderDetail: { ...state.orderDetail },
        loading: true
      }
    case types.GET_ORDER_DETAIL_SUCCESS:
      return {
        ...state,
        orderDetail: action.payload,
        loading: false
      }
      case types.LOGOUT:
      return {
        ...initialState
      }
    default:
      return state
  }
}
