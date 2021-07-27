/**
* Created by bavv on 26/11/2020
* Copyright (c) 2020 bavv
*/

import * as types from '../types';
export const addUserIdDevice = (data) => {
  return {
    type: types.ADD_USER_ID_DEVICE,
    payload: data
  }
}

export const addUserIdDeviceSuccess = (data) => {
  return {
    type: types.ADD_USER_ID_DEVICE_SUCCESS,
    payload: data
  }
}

export const addUserIdDeviceFailed = () => {
  return {
    type: types.ADD_USER_ID_DEVICE_FAILED
  }
}

export const removeUserIdDevice = (data) => {
  return {
    type: types.REMOVE_USER_ID_DEVICE,
    payload: data
  }
}

export const removeUserIdDeviceSuccess = (data) => {
  return {
    type: types.REMOVE_USER_ID_DEVICE_SUCCESS,
    payload: data
  }
}

export const removeUserIdDeviceFailed = () => {
  return {
    type: types.REMOVE_USER_ID_DEVICE_FAILED
  }
}

