/**
* Created by bavv on 26/06/2020
* Copyright (c) 2020 bavv
*/

import * as types from '../types';

const initialState = {
  isLoading: false,
  user: {},
  token: undefined,
  notify: true,
  notificationDevice: {
    token: null,
    userId: null
  },
};

export default function config(state = initialState, action) {
  switch (action.type) {
    case types.REGISTER_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
      }
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
      }
    case types.GET_PROFILE_SUCCESS:
      return {
        ...state,
        user: { ...state.user, ...action.payload },
      }
    case types.LOGIN_SOCIAL_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
      }
    case types.SHOW_LOADING:
      return {
        ...state,
        isLoading: true
      }
    case types.HIDE_LOADING:
      return {
        ...state,
        isLoading: false
      }
    case types.ADD_USER_ID_DEVICE:
      return {
        ...state,
        notificationDevice: {
          // token: action.payload && action.payload.token ? action.payload.token : state.notificationDevice.token,
          userId: action.payload && action.payload.userId ? action.payload.userId : state.notificationDevice.userId,
        }
      }
    case types.ADD_USER_ID_DEVICE_SUCCESS:
      return {
        ...state,
        notificationDevice: {
          // token: action.payload && action.payload.token ? action.payload.token : state.notificationDevice.token,
          userId: action.payload && action.payload.userId ? action.payload.userId : state.notificationDevice.userId,
        }
      }
    case types.REMOVE_USER_ID_DEVICE_SUCCESS:
      return {
        ...state,
        notificationDevice: {
          ...state.notificationDevice,
          token: null
        }
      }
    case types.RESET_CONFIG:
      return {
        ...initialState
      }
    case types.LOGOUT:
      return {
        ...initialState
      }
    default:
      return state
  }
}
