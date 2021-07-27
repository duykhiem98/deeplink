/**
* Created by bavv on 26/06/2020
* Copyright (c) 2020 bavv
*/

import * as types from '../types';

const initialState = {
  loading: false,
  cart: {
  },
};

export default function config(state = initialState, action) {
  switch (action.type) {
    case types.GET_MY_CART:
      return {
        ...state,
        cart: { ...state.cart },
        loading: true
      }
    case types.GET_MY_CART_SUCCESS:
      return {
        ...state,
        cart: action.payload,
        loading: false
      }
    case types.ADD_TO_CART_SUCCESS:
      return {
        ...state,
      }
    case types.REMOVE_ITEM_FROM_CART_SUCCESS:
      return {
        ...state,
      }
    case types.CANCEL_ORDER_SUCCESS:
      return {
        ...state,
      }
    case types.DRAFT_CART:
      return {
        ...state,
        cart: { ...state.cart, items: state.cart.items.map(e => e.id === action.payload.itemId ? { ...e, quantity: action.payload.quantity } : e) },
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
