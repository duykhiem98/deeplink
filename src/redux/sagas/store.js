/**
* Created by bavv on 26/06/2020
* Copyright (c) 2020 bavv
*/

import { takeLatest, put, delay } from "redux-saga/effects";
import * as types from '../types';
import * as actions from '../actions/store';
import { _global } from '../../core/global';

/**
* 
*/
function* sagaGetStoreById(action) {
  try {
    const response = yield _global.connection.getStoreById(action.payload);
    yield put(actions.getStoreByIdSuccess(response));
  } catch (e) {
    console.log('sagaGetStoreById err:', e);
    yield put(actions.getStoreByIdFailed());
  }
}

export function* watchGetProduct() {
  yield takeLatest(types.GET_STORE_BY_ID, sagaGetStoreById);
}
