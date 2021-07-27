/**
* Created by bavv on 26/06/2020
* Copyright (c) 2020 bavv
*/

import { takeLatest, put, delay } from "redux-saga/effects";
import * as types from '../types';
import * as actions from '../actions/notification';
import { _global } from '../../core/global';

/**
* 
*/
function* sagaGetNotification(action) {
  try {
    const response = yield _global.connection.getNotification(action.payload);
    yield put(actions.getNotificationSuccess(response));
  } catch (e) {
    console.log('sagaGetNotification err:', e);
    yield put(actions.getNotificationFailed());
  }
}

export function* watchGetNotification() {
  yield takeLatest(types.GET_NOTIFICATION, sagaGetNotification);
}