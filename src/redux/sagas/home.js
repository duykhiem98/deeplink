/**
* Created by bavv on 26/06/2020
* Copyright (c) 2020 bavv
*/

import { takeLatest, put, delay } from "redux-saga/effects";
import * as types from '../types';
import * as actions from '../actions/home';
import { _global } from '../../core/global';

/**
* 
*/
function* sagaGetHomeProduct(action) {
  try {
    const response = yield _global.connection.getProducts(action.payload);
    yield put(actions.getHomeProductSuccess(response));
  } catch (e) {
    console.log('sagaGetHomeProduct err:', e);
    yield put(actions.getHomeProductFailed());
  }
}

export function* watchGetHomeProduct() {
  yield takeLatest(types.GET_HOME_PRODUCT, sagaGetHomeProduct)
}

function* sagaGetBanner(action) {
  try {
    const response = yield _global.connection.getBanner(action.payload);
    yield put(actions.getBannerSuccess(response));
  } catch (e) {
    console.log('sagaGetBanner err:', e);
    yield put(actions.getBannerFailed());
  }
}

export function* watchGetBanner() {
  yield takeLatest(types.GET_BANNER, sagaGetBanner)
}

function* sagaGetFlag(action) {
  try {
    const response = yield _global.connection.getFlag(action.payload);
    yield put(actions.getFlagSuccess(response));
  } catch (e) {
    console.log('sagaGetFlag err:', e);
    yield put(actions.getFlagFailed());
  }
}

export function* watchGetFlag() {
  yield takeLatest(types.GET_FLAG, sagaGetFlag)
}