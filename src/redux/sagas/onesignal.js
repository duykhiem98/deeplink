/**
* Created by bavv on 26/11/2020
* Copyright (c) 2020 bavv
*/

import { takeLatest, put, select } from "redux-saga/effects";
import * as types from '../types';
import { addUserIdDeviceSuccess, removeUserIdDeviceSuccess } from '../actions/onesignal';
import { _global } from "../../core/global";

const notificationDeviceSelect = state => state.config.notificationDevice;
const tokenSelect = state => state.config.token;

/**
* AddUserIdDevice
*/
function* sagaAddUserIdDevice(action) {
  const notificationDevice = yield select(notificationDeviceSelect);
  let userId = action && action.payload && action.payload.userId || notificationDevice.userId;
  if (!userId) {
    console.log(`sagaAddUserIdDevice: userId rỗng`);
    return;
  }
  const token = yield select(tokenSelect);
  console.log(`sagaAddUserIdDevice:`, userId, token);
  try {
    if (!!token && userId) {
      const response = yield _global.connection.subcribeNotification({ device_token: userId }, { dontShowLoading: true })
      if (response.success) {
        yield put(addUserIdDeviceSuccess(response.data))
      }
    }
  } catch (e) {
    console.log('Catche add user id device', e)
  }
}

export function* watchAddUserIdDevice() {
  yield takeLatest(types.ADD_USER_ID_DEVICE, sagaAddUserIdDevice)
}

/**
* sagaRemoveUserIdDevice
*/
function* sagaRemoveUserIdDevice() {
  const notificationDevice = yield select(notificationDeviceSelect);
  try {
    if (notificationDevice.userId) {
      const response = yield _global.connection.unsubcribeNotification({ device_token: notificationDevice.userId })
      if (response.success) {
        yield put(removeUserIdDeviceSuccess(response.data))
      }
    }
  } catch (e) {
    console.log('Catche add user id device', e)
  }
}

export function* watchRemoveUserIdDevice() {
  yield takeLatest(types.REMOVE_USER_ID_DEVICE, sagaRemoveUserIdDevice)
}