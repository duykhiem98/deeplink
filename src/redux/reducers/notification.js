/**
* Created by bavv on 26/06/2020
* Copyright (c) 2020 bavv
*/

import * as types from '../types';

const initialState = {
  loading: false,
  notifications: [],
};

export default function config(state = initialState, action) {
  switch (action.type) {
    case types.GET_NOTIFICATION:
      return {
        ...state,
        loading: true,
        notifications: state.notifications,
      }
    case types.GET_NOTIFICATION_SUCCESS:
      return {
        ...state,
        loading: false,
        notifications: action.payload,
      }
      case types.LOGOUT:
      return {
        ...initialState
      }
    default:
      return state
  }
}
