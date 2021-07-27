/**
* Created by bavv on 26/06/2020
* Copyright (c) 2020 bavv
*/

import { takeLatest, put, delay } from "redux-saga/effects";
import * as types from '../types';
import * as actions from '../actions/shipping-address';
import { _global } from '../../core/global';

/**
* 
*/
function* sagaGetCity(action) {
  try {
    let { callback } = action.payload;
    const response = yield _global.connection.getCity();
    yield put(actions.getCitySuccess(response));
    callback && callback();
  } catch (e) {
    console.log('sagaGetCity err:', e);
    yield put(actions.getCityFailed());
  }
}

export function* watchGetCity() {
  yield takeLatest(types.GET_CITY, sagaGetCity);
}

/**
* 
*/
function* sagaGetDistrict(action) {
  try {
    let { cityCode, callback } = action.payload;
    const response = yield _global.connection.getDistrict({ cityCode });
    yield put(actions.getDistrictSuccess(response));
    callback && callback();
  } catch (e) {
    console.log('sagaGetDistrict err:', e);
    yield put(actions.getDistrictFailed());
  }
}

export function* watchGetDistrict() {
  yield takeLatest(types.GET_DISTRICT, sagaGetDistrict);
}

/**
* 
*/
function* sagaGetWard(action) {
  try {
    let { districtCode, callback } = action.payload;
    const response = yield _global.connection.getWard({ districtCode });
    yield put(actions.getWardSuccess(response));
    callback && callback();
  } catch (e) {
    console.log('sagaGetWard err:', e);
    yield put(actions.getWardFailed());
  }
}

export function* watchGetWard() {
  yield takeLatest(types.GET_WARD, sagaGetWard);
}

/**
* 
*/
function* sagaGetMyShippingAddress(action) {
  try {
    const response = yield _global.connection.getMyShippingAddress(action.payload);
    yield put(actions.getMyShippingAddressSuccess(response));
  } catch (e) {
    console.log('sagaGetMyShippingAddress err:', e);
    yield put(actions.getMyShippingAddressFailed());
  }
}

export function* watchGetMyShippingAddress() {
  yield takeLatest(types.GET_MY_SHIPPING_ADDRESS, sagaGetMyShippingAddress);
}

/**
* 
*/
function* sagaAddMyShippingAddress(action) {
  try {
    let { shippingAddress, callback } = action.payload;
    const response = yield _global.connection.addMyShippingAddress(shippingAddress);
    yield put(actions.addMyShippingAddressSuccess(response));
    callback && callback();
  } catch (e) {
    console.log('sagaAddMyShippingAddress err:', e);
    yield put(actions.addMyShippingAddressFailed());
  }
}

export function* watchAddMyShippingAddress() {
  yield takeLatest(types.ADD_MY_SHIPPING_ADDRESS, sagaAddMyShippingAddress);
}
