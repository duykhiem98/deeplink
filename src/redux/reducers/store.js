/**
* Created by bavv on 26/06/2020
* Copyright (c) 2020 bavv
*/

import * as types from '../types';

const initialState = {
  loading: false,
  storeDetail: {
  },
};

export default function config(state = initialState, action) {
  switch (action.type) {
    case types.GET_STORE_BY_ID:
      return {
        ...state,
        storeDetail: state.storeDetail,
        loading: true
      }
    case types.GET_STORE_BY_ID_SUCCESS:
      return {
        ...state,
        storeDetail: action.payload,
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