/**
* Created by bavv on 26/06/2020
* Copyright (c) 2020 bavv
*/

import { takeLatest, put, delay } from "redux-saga/effects";
import * as types from '../types';
import * as actions from '../actions/livestream';
import { _global } from '../../core/global';

/**
* 
*/
function* sagaGetLivestream(action) {
  try {
    const response = yield _global.connection.getLivestream(action.payload);
    yield put(actions.getLivestreamSuccess(response));
  } catch (e) {
    console.log('sagaGetLivestream err:', e);
    yield put(actions.getLivestreamFailed());
  }
}

export function* watchGetLivestream() {
  yield takeLatest(types.GET_LIVESTREAM, sagaGetLivestream)
}

/**
* 
*/
function* sagaGetLivestreamDetail(action) {
  try {
    const response = yield _global.connection.getLivestreamDetail(action.payload);
    yield put(actions.getLivestreamDetailSuccess(response));
  } catch (e) {
    console.log('sagaGetLivestreamDetail err:', e);
    yield put(actions.getLivestreamDetailFailed());
  }
}

export function* watchGetLivestreamDetail() {
  yield takeLatest(types.GET_LIVESTREAM_DETAIL, sagaGetLivestreamDetail)
}

/**
* 
*/
function* sagaGetProductOfLivestream(action) {
  try {
    const response = yield _global.connection.getProductOfLivestream(action.payload);
    yield put(actions.getProductOfLivestreamSuccess(response));
  } catch (e) {
    console.log('sagaGetProductOfLivestream err:', e);
    yield put(actions.getProductOfLivestreamFailed());
  }
}

export function* watchGetProductOfLivestream() {
  yield takeLatest(types.GET_LIVESTREAM_DETAIL, sagaGetProductOfLivestream)
}